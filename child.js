// app.js
import { exec } from "child_process";

function getYouTubeTranscripts(videoId) {
  return new Promise((resolve, reject) => {
    exec(`python transcripts.py ${videoId}`, (error, stdout, stderr) => {
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
    });
  });
}

// Example usage
getYouTubeTranscripts("RNEuvhWgY8I")
  .then((transcripts) => {
    console.log(transcripts);
  })
  .catch((error) => {
    console.error("Error fetching transcripts:", error);
  });
