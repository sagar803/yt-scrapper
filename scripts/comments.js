import puppeteer from "puppeteer";

export const getComments = async (videoLink) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(videoLink, { waitUntil: "networkidle2" });

    let scroll = 500;
    while (scroll < 3000) {
      await page.evaluate(`window.scrollTo(0, ${scroll})`);
      scroll += 500;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    await page.waitForSelector("ytd-comment-thread-renderer", {
      timeout: 30000,
    });
    const comments = await page.evaluate(() => {
      const commentElements = document.querySelectorAll(
        "#contents #content-text"
      );
      return Array.from(commentElements).map((el) => el.innerText);
    });

    await browser.close();
    return comments;
  } catch (error) {
    console.log(`Error scrapping comments for ${videoLink}`);
  }
};
