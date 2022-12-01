const puppeteer = require("puppeteer");
const debug = require("debug")("scraper");
const fs = require("fs");

let count = 103149;
const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://result19.comillaboard.gov.bd/SSC22");

  debug("go to result input page");

  await page.type(".input-xlarge", `${count}`);
  // await page.select("select", "100");
  await page.click(".btn-primary");
  debug("select per page 100 data");
  // const lastPageNumber = await lastPageNumberx(page);
  debug("find out last page number");

  // var result = [];

  // for (let i = 0; i < lastPageNumber; i++) {
  // await page.screenshot({ path: `image/screenshot${Date.now()}.png` });

  const { data, length } = await extractedEvaluateCall(page);
  result = result.concat(data);
  // count += length;

  // if (i !== lastPageNumber - 1) {
  //   await page.click("#dataTables-example_next > a");
  // }
  // }
  debug("grab all required data from website");
  await browser.close();
  return result;
};

const extractedEvaluateCall = async (page) => {
  return await page.evaluate((count) => {
    let data = [];

    // const schoolName = document
    //   .querySelectorAll("table tbody")
    //   .children[0].children[1].innerText.replace(/\s*\(.*?\)\s*/g, "");
    const EIIN = count;
    const elements = document
      .querySelectorAll("div")
      .children[3].innerText.split(",");
    const length = elements.length;
    data = elements;
    // console.log(schoolName);

    return { data, length };
  }, count);
};

// scrape().then((rawData) => {
//   console.log(rawData);
// });
(async () => {
  const result = await scrape();
  // const newData = addIdFunction(result);
  debug("add id on all object");
  // fs.writeFile("sscResult.txt", JSON.stringify(result), (e) => {
  //   if (e) {
  //     console.log(e);
  //   }
  // });
  debug("file saved with data");
})();
