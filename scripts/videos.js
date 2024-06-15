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
