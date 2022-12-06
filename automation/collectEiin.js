const puppeteer = require("puppeteer");
const fs = require("fs");
const debug = require("debug");
const fetch = require("node-fetch");

let count = 0;
const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.exposeFunction("saveToDB", saveToDB);
  await page.goto(
    "https://eboardresults.com/app/stud/btbl.html?board=comilla&exam=ssc&year=2022&url=/v2/list%3Fid%3Dbtree",
    {
      waitUntil: "networkidle0",
    }
  );

  debug("go to school list page");

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
      await page.click("#btbl_next");
    }
  }

  debug("grab all required data from website");
  await browser.close();
  return result;
};

const lastPageNumberx = async (page) => {
  const data = await page.evaluate(() => {
    const lastPage = document.querySelectorAll("span")[0].lastChild.innerText;
    return lastPage;
  });
  return data;
};

const extractedEvaluateCall = async (page) => {
  const data = await page.evaluate(
    async ({ count }) => {
      let data = [];

      const elements = document.querySelectorAll("tbody > tr");
      const length = elements.length;

      for (let element of elements) {
        count += 1;
        let id = count;
        let eiin = element.children[0].innerText;
        let schoolName = element.children[2].innerText;
        let zilla = element.children[3].innerText;
        let upazila = element.children[4].innerText;

        data.push({ id, eiin, schoolName, zilla, upazila });
        const cc = { eiin, name: schoolName, zilla, upazila };
        await saveToDB(cc);
      }

      return { data, length };
    },
    { count }
  );

  await page.waitForTimeout(500);
  return data;
};

const saveToDB = async (requestData) => {
  const res = await fetch("http://localhost:5000/school", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const dd = await res.json();
  console.log(dd);
};

(async () => {
  const result = await scrape();
  // const newData = addIdFunction(result);
  debug("add id on all object");
  // fs.writeFile("comillaBoardSchoolList.txt", JSON.stringify(result), (e) => {
  //   if (e) {
  //     console.log(e);
  //   }
  // });
  debug("file saved with data");
})();
