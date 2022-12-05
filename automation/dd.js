const puppeteer = require("puppeteer");
const fs = require("fs");
const { roll } = require("./roll/roll");
const fetch = require("node-fetch");

const scrape = async (rData) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.exposeFunction("saveToDB", saveToDB);
  let data = [];

  for (const roll of rData) {
    await page.goto("https://result19.comillaboard.gov.bd/SSC22/individual/");
    await page.type("#roll", roll);
    await Promise.all([
      page.waitForNavigation(),
      page.click(".button2", { delay: 1000 }),
    ]);
    let response = await page.evaluate(async () => {
      const roll = document.querySelector("tbody > tr").children[1].innerText;
      const name = document.querySelector("tbody > tr").children[3].innerText;
      const board =
        document.querySelector("tbody").children[1].children[1].innerText;
      const fatherName =
        document.querySelector("tbody").children[1].children[3].innerText;

      const group =
        document.querySelector("tbody").children[2].children[1].innerText;
      const motherName =
        document.querySelector("tbody").children[2].children[3].innerText;
      const type =
        document.querySelector("tbody").children[3].children[1].innerText;
      const institute =
        document.querySelector("tbody").children[3].children[3].innerText;
      const gPA =
        document.querySelector("tbody").children[4].children[3].innerText;
      const subjectCode =
        document.querySelector(".tftable2 > tbody").children[1].children[0]
          .innerText;
      const subjectName =
        document.querySelector(".tftable2 > tbody").children[1].children[1]
          .innerText;
      const subjectGPA =
        document.querySelector(".tftable2 > tbody").children[1].children[2]
          .innerText;
      const dd = {
        roll,
        name,
        board,
        fatherName,
        group,
        motherName,
        type,
        institute,
        gPA,
        subjectCode,
        subjectName,
        subjectGPA,
      };

      await saveToDB(dd);

      return dd;
    });

    data.push(response);

    // await page.waitForTimeout(2000);

    console.log("data scraped done");
  }

  await browser.close();
  return data;
};

const saveToDB = async (requestData) => {
  const res = await fetch("http://localhost:5000/", {
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
  const d = ["183502", "183503", "183504"];
  const response = await scrape(d);
  fs.writeFile("result.txt", JSON.stringify(response), (err) => {
    err && console.log(err);
  });
})();
