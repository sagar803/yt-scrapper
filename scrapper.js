import puppeteer from "puppeteer";
import fs from "fs";
import util from "util";
import { getComments } from "./comments.js";

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const mkdirAsync = util.promisify(fs.mkdir);

async function searchYouTube(keyword) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //filter to get videos uploaded within 1 year
  const sp = "CAASBAgFEAE%253D";
  await page.goto(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      keyword
    )}&sp=CAASBAgFEAE%253D`
  );

  // Search for the keyword
  // await page.type("input#search", keyword);
  // await page.click("button#search-icon-legacy");
  await page.waitForSelector("ytd-video-renderer");

  //scroll to get more result
  // let scroll = 500;
  // while (scroll < 3000) {
  //   await page.evaluate(`window.scrollTo(0, ${scroll})`);
  //   scroll += 500;
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  // }
  // Extract video links and upload dates
  const videos = await page.evaluate(() => {
    const videoElements = document.querySelectorAll("ytd-video-renderer");
    const videoData = [];
    videoElements.forEach((video) => {
      console.log(video);
      const title = video.querySelector("a#video-title")?.innerText;
      const link = video.querySelector("a#video-title")?.href;
      const uploadDate = video.querySelector(
        "div#metadata-line span:nth-of-type(2)"
      )?.innerText;

      videoData.push({ title, link, uploadDate });
    });
    return videoData;
  });

  await browser.close();
  return videos;
}

(async () => {
  const keywords = [
    "Delhi NCR real estate",
    "property listing Delh",
    "house for sale in Delhi NCR",
  ];
  let allVideos = [];

  for (const keyword of keywords) {
    const videos = await searchYouTube(keyword);
    allVideos = allVideos.concat(videos);
  }
  console.log(allVideos);

  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const filename = `scraped_data_${timestamp}.txt`;
  await mkdirAsync("./scraped_data", { recursive: true });
  await writeFileAsync(filename, JSON.stringify([], null, 2), "utf8");

  // scrapping comments for each video
  for (const video of allVideos) {
    video.comments = await getComments(video.link);
    const currentData = await fs.promises.readFile(filename, "utf8");
    const jsonData = JSON.parse(currentData);
    jsonData.push(video);
    const dataToSave = JSON.stringify(jsonData, null, 2);

    await writeFileAsync(filename, dataToSave, "utf8");
    console.log(`Appended data for video: ${video.title}`);
    //    video.transcript = details.transcript;
  }

  console.log(`Data saved to ${filename}`);
  // Save data to file
  // const dataToSave = JSON.stringify(allVideos, null, 2);
  // await writeFileAsync(filename, dataToSave, "utf8");
  // console.log(`Data saved to ${filename}`);
})();
