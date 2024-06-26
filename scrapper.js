import fs from "fs";
import util from "util";
import { exec } from "child_process";
import { keywords, keymoments_instructions } from "./inputs.js";
import { getComments } from "./scripts/comments.js";
import { searchYouTube } from "./scripts/videos.js";
import path from "path";
import { fileURLToPath } from "url";
import { extractKeyphraseGemini } from "./scripts/keymoments.js";

const writeFileAsync = util.promisify(fs.writeFile);
const mkdirAsync = util.promisify(fs.mkdir);

function getYouTubeTranscripts(videoId) {
  return new Promise((resolve, reject) => {
    exec(
      `python scripts/transcripts.py ${videoId}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(stderr);
          return;
        }
        try {
          const transcripts = JSON.parse(stdout);
          resolve(transcripts);
        } catch (e) {
          console.error("Error parsing JSON", e);
          reject(e);
        }
      }
    );
  });
}

(async () => {
  let allVideos = [];

  for (const keyword of keywords) {
    try {
      const videos = await searchYouTube(keyword);
      allVideos = allVideos.concat(videos);
      console.log(`Gathered ${videos.length} videos for: ${keyword}`);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(`Total Videos Gathered: ${allVideos.length}`);

  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const filename = `scraped_data_${timestamp}.txt`;

  // Convert __dirname for ES modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dir = path.join(__dirname, "scraped_data");
  const filepath = path.join(dir, filename);

  await mkdirAsync(dir, { recursive: true });
  await writeFileAsync(filepath, JSON.stringify([], null, 2), "utf8");

  console.log(`Writing data on File: ${filename}`);
  // scrapping comments and transcripts for each video
  for (const video of allVideos) {
    try {
      //scrapping comments
      video.comments = await getComments(video.link);

      //scrapping transcripts
      let transcripts = await getYouTubeTranscripts(video.videoId);
      video.transcripts = {};
      let transcript_string = transcripts[0]
        ?.map((item) => item.text)
        .join(" ");
      video.transcripts.string = transcript_string;
      video.transcripts.timestamped = transcripts[0];

      //scrapping keyphrase
      if (transcript_string && transcript_string.length > 0) {
        const res = await extractKeyphraseGemini(
          keymoments_instructions + transcript_string
        );
        const array = res.split("-");
        video.keyphrase = array.map((s) => s.trim());
      } else video.keyphrase = [];

      //appending data to the file
      const currentData = await fs.promises.readFile(filepath, "utf8");
      const jsonData = JSON.parse(currentData);
      jsonData.push(video);
      const dataToSave = JSON.stringify(jsonData, null, 2);
      await writeFileAsync(filepath, dataToSave, "utf8");
      console.log(`Appended data for video: ${video.title}`);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(`Data saved to ${filename}`);
  // Save data to file
  // const dataToSave = JSON.stringify(allVideos, null, 2);
  // await writeFileAsync(filename, dataToSave, "utf8");
  // console.log(`Data saved to ${filename}`);
})();
