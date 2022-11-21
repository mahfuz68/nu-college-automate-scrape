const puppeteer = require("puppeteer");
const debug = require("debug")("scraper");
const fs = require("fs");

let count = 0;
const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://www.nubd.info/college/college_details.php");

  debug("go to nu page");

  await page.select("select", "100");
  debug("select per page 100 data");
  const lastPageNumber = await lastPageNumberx(page);
  debug("find out last page number");

  var result = [];

  for (let i = 0; i < lastPageNumber; i++) {
    // await page.screenshot({ path: `image/screenshot${Date.now()}.png` });

    const { data, length } = await extractedEvaluateCall(page);
    result = result.concat(data);
    count += length;

    if (i !== lastPageNumber - 1) {
      await page.click("#dataTables-example_next > a");
    }
  }
  debug("grab all required data from website");
  await browser.close();
  return result;
};

const lastPageNumberx = async (page) => {
  const data = await page.evaluate(() => {
    const pagination = document.querySelectorAll(".paginate_button");
    const length = pagination.length;
    const lastNumber = length - 2;
    const lastPage = pagination[lastNumber].children[0].innerText;
    return lastPage;
  });
  return data;
};

const extractedEvaluateCall = async (page) => {
  return await page.evaluate((count) => {
    let data = [];

    const elements = document.querySelectorAll(".gradeX");
    const length = elements.length;

    for (let element of elements) {
      count += 1;
      let id = count;
      let value = element.children[0].children[0].innerText;
      let label = element.children[1].innerText;

      data.push({ id, value, label });
    }
    return { data, length };
  }, count);
};

const addIdFunction = (data) => {
  let i = 1;
  const refinedData = data.map((e) => {
    const cc = {
      id: i,
      value: e.collegeCode,
      label: e.collegeName,
    };

    i += 1;
    return cc;
  });
  return refinedData;
};

// scrape().then((rawData) => {
//   console.log(rawData);
// });
(async () => {
  const result = await scrape();
  // const newData = addIdFunction(result);
  debug("add id on all object");
  fs.writeFile("collegeLIst.txt", JSON.stringify(result), (e) => {
    if (e) {
      console.log(e);
    }
  });
  debug("file saved with data");
})();
