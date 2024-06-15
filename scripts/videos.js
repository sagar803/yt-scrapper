import puppeteer from "puppeteer";

export const searchYouTube = async (keyword) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //filter to get videos uploaded within 1 year
  const sp = "CAASBAgFEAE%253D";
  await page.goto(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      keyword
    )}&sp=${sp}`
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
      // Extract video ID from the link
      const urlParams = new URLSearchParams(link.split("?")[1]);
      const videoId = urlParams.get("v");

      videoData.push({ title, link, uploadDate, videoId });
    });
    return videoData;
  });

  await browser.close();
  return videos;
};

// function convertFuzzyDateToDate(fuzzyDateString) {
//   const units = fuzzyDateString.split(/\s+/)[0]; // Extract the number (e.g., "9")
//   const unitType = fuzzyDateString.split(/\s+/)[1].toLowerCase(); // Extract the unit (e.g., "month")

//   const now = new Date();

//   switch (unitType) {
//     case "year":
//       now.setFullYear(now.getFullYear() - parseInt(units));
//       break;
//     case "month":
//       now.setMonth(now.getMonth() - parseInt(units));
//       break;
//     case "week":
//       now.setDate(now.getDate() - (parseInt(units) * 7));
//       break;
//     case "day":
//       now.setDate(now.getDate() - parseInt(units));
//       break;
//     default:
//       console.warn("Unsupported unit:", unitType);
//       return null;
//   }

//   return now.toISOString().split('T')[0]; // Return the date part only (YYYY-MM-DD)
// }
