const puppeteer = require("puppeteer");
const fs = require("fs");

const { response } = require("express");
const { accessSync } = require("fs");

const scrapeSchoolFull = async (eiin) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://result19.comillaboard.gov.bd/SSC22", {
    waitUntil: "networkidle0",
  });

  await page.type(".input-xlarge", eiin.toString());
  await Promise.all([page.waitForNavigation(), page.click(".btn-primary")]);
  // await page.click(".btn-primary");

  const response = await page.evaluate(() => {
    const result = document.querySelector("div > div").innerHTML.split(",");
    const schoolName = document
      .querySelector("tbody > tr")
      .children[1].innerHTML.replace(/\s*\(.*?\)\s*/g, "");

    let roll = [];
    for (const r of result) {
      if (r.trimStart().length === 12) {
        const tt = r.replace(/\s*\[.*?\]\s*/g, "");
        roll.push(tt.trim());
      } else {
        const dd = r?.split(":");

        const lastElement = dd[dd.length - 1];
        if (lastElement.trimStart().startsWith("<br>")) {
          const withBreak = lastElement
            .split("<br>")[1]
            .replace(/\s*\[.*?\]\s*/g, "");
          roll.push(withBreak);
        } else {
          const refinedData = lastElement
            .trimStart()
            .replace(/\s*\[.*?\]\s*/g, "");
          if (Number(refinedData)) {
            roll.push(refinedData);
          }
        }
      }
    }
    const length = roll.length;
    return { schoolName, roll, length };
  });

  await saveToTextFile(response.roll, eiin);
  console.log("file save successfully");

  await browser.close();
};

const saveToTextFile = async (data, eiin) => {
  fs.writeFile(`${eiin}.txt`, JSON.stringify(data), (err) => {
    err && console.log(err);
  });
};

const ll = [
  {
    id: 1,
    EIIN: "103155",
    schoolName: "GOLKHAR RANI KHAR HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
];
(async () => {
  for (const data of ll) {
    await scrapeSchoolFull(data?.EIIN);
  }
})();
