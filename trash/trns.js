import puppeteer from "puppeteer";

export const getVideoDetails = async (videoLink) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(videoLink, { waitUntil: "networkidle2" });

    await page.evaluate(`window.scrollTo(0, 400)`);
    await page.waitForSelector("div#bottom-row");
    await page.click("div#bottom-row");

    await page.waitForSelector(
      "#primary-button > ytd-button-renderer > yt-button-shape > button"
    );
    await page.click(
      "#primary-button > ytd-button-renderer > yt-button-shape > button"
    );

    // const element = await page.waitForXPath(
    //   '//*[@id="primary-button"]/ytd-button-renderer/button'
    // );

    // Get transcript
    // const transcriptButton = await page.$x(
    //   "//yt-formatted-string[contains(text(), 'Show transcript')]"
    // );
    // let transcript = "";
    // if (transcriptButton.length > 0) {
    //   await transcriptButton[0].click();
    //   await page.waitForSelector("ytd-transcript-body-renderer", {
    //     timeout: 60000,
    //   });
    //   transcript = await page.evaluate(() => {
    //     return Array.from(
    //       document.querySelectorAll("ytd-transcript-body-renderer > div")
    //     )
    //       .map((el) => el.innerText)
    //       .join(" ");
    //   });
    // }

    await browser.close();
    return {};
  } catch (error) {
    console.log("some error", error);
  }
};

const start = async () => {
  const link =
    "https://www.youtube.com/watch?v=yvI2Myk3_Lc&pp=ygUVRGVsaGkgTkNSIHJlYWwgZXN0YXRl";
  try {
    console.log("Fetching video details");
    const details = await getVideoDetails(link);
    console.log("Comments extracted:", details.comments);
  } catch (error) {
    console.error("Error fetching video details:", error);
  }
};
start();
