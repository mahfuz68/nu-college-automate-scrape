const puppeteer = require("puppeteer");
const debug = require("debug")("scraper");
const fs = require("fs");

count = 1;
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

    result = result.concat(await extractedEvaluateCall(page));

    // console.log(count);
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
  const response = await page.evaluate((count) => {
    let data = [];

    let elements = document.querySelectorAll(".gradeX");
    
    for (let element of elements) {
      let collegeCode = element.children[0].children[0].innerText;
      let collegeName = element.children[1].innerText;
      
      data.push({ collegeCode, collegeName });

      count += 1
    }

    return {data, count};
  }, count);

  console.log(response)

  return response;
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
  const data = await scrape();
  const newData = addIdFunction(data);
  debug("add id on all object");
  fs.writeFile("collegeLIst.txt", JSON.stringify(newData), (e) => {
    if (e) {
      console.log(e);
    }
  });
  debug("file saved with data");
})();
