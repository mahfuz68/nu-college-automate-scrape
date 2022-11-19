const puppeteer = require("puppeteer");
const debug = require("debug")("scraper");
// const bull = require("bull");

// const { Que } = bull
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://www.nubd.info/college/college_details.php");

  debug("go to the page");
  await page.select("select", "100");
  debug("select 100 data");

  const data = await page.evaluate(() => {
    return [...document.querySelectorAll("tr.gradeX")].map((i) => {
      const data = i.innerText;

      return data.split("\t");
    });
  });

  debug("grab all data");

  console.log(data);
  // await page.waitFor(1000);
  await page.screenshot({ path: `image/screenshot${Date.now()}.png` });
  await browser.close();
})();
