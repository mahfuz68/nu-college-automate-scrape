const puppeteer = require("puppeteer");
const fs = require("fs");
const fetch = require("node-fetch");

const scrape = async (rData, eiin) => {
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
    let response = await page.evaluate(async (eiin) => {
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
      const attendance =
        document.querySelector("tbody").children[4].children[1].innerText;
      const gPA =
        document.querySelector("tbody").children[4].children[3].innerText;

      let result = "";

      if (attendance !== "ABSENT") {
        const subject1Code =
          document.querySelector(".tftable2 > tbody").children[1].children[0]
            .innerText;
        const subject1Name =
          document.querySelector(".tftable2 > tbody").children[1].children[1]
            .innerText;
        const subject1GPA =
          document.querySelector(".tftable2 > tbody").children[1].children[2]
            .innerText;
        const subject2Code =
          document.querySelector(".tftable2 > tbody").children[2].children[0]
            .innerText;
        const subject2Name =
          document.querySelector(".tftable2 > tbody").children[2].children[1]
            .innerText;
        const subject2GPA =
          document.querySelector(".tftable2 > tbody").children[2].children[2]
            .innerText;

        const subject3Code =
          document.querySelector(".tftable2 > tbody").children[3].children[0]
            .innerText;
        const subject3Name =
          document.querySelector(".tftable2 > tbody").children[3].children[1]
            .innerText;
        const subject3GPA =
          document.querySelector(".tftable2 > tbody").children[3].children[2]
            .innerText;

        const subject4Code =
          document.querySelector(".tftable2 > tbody").children[4].children[0]
            .innerText;
        const subject4Name =
          document.querySelector(".tftable2 > tbody").children[4].children[1]
            .innerText;
        const subject4GPA =
          document.querySelector(".tftable2 > tbody").children[4].children[2]
            .innerText;

        const subject5Code =
          document.querySelector(".tftable2 > tbody").children[5].children[0]
            .innerText;
        const subject5Name =
          document.querySelector(".tftable2 > tbody").children[5].children[1]
            .innerText;
        const subject5GPA =
          document.querySelector(".tftable2 > tbody").children[5].children[2]
            .innerText;

        const subject6Code =
          document.querySelector(".tftable2 > tbody").children[6].children[0]
            .innerText;
        const subject6Name =
          document.querySelector(".tftable2 > tbody").children[6].children[1]
            .innerText;
        const subject6GPA =
          document.querySelector(".tftable2 > tbody").children[6].children[2]
            .innerText;

        const subject7Code =
          document.querySelector(".tftable2 > tbody").children[7].children[0]
            .innerText;
        const subject7Name =
          document.querySelector(".tftable2 > tbody").children[7].children[1]
            .innerText;
        const subject7GPA =
          document.querySelector(".tftable2 > tbody").children[7].children[2]
            .innerText;

        const subject8Code =
          document.querySelector(".tftable2 > tbody").children[8].children[0]
            .innerText;
        const subject8Name =
          document.querySelector(".tftable2 > tbody").children[8].children[1]
            .innerText;
        const subject8GPA =
          document.querySelector(".tftable2 > tbody").children[8].children[2]
            .innerText;

        const subject9Code =
          document.querySelector(".tftable2 > tbody").children[9].children[0]
            .innerText;
        const subject9Name =
          document.querySelector(".tftable2 > tbody").children[9].children[1]
            .innerText;
        const subject9GPA =
          document.querySelector(".tftable2 > tbody").children[9].children[2]
            .innerText;

        const subject10Code =
          document.querySelector(".tftable2 > tbody").children[10].children[0]
            .innerText;
        const subject10Name =
          document.querySelector(".tftable2 > tbody").children[10].children[1]
            .innerText;
        const subject10GPA =
          document.querySelector(".tftable2 > tbody").children[10].children[2]
            .innerText;

        const subject11Code =
          document.querySelector(".tftable2 > tbody").children[12].children[0]
            .innerText;
        const subject11Name =
          document.querySelector(".tftable2 > tbody").children[12].children[1]
            .innerText;
        const subject11GPA =
          document.querySelector(".tftable2 > tbody").children[12].children[2]
            .innerText;

        const subject12Code =
          document.querySelector(".tftable2 > tbody").children[13].children[0]
            .innerText;
        const subject12Name =
          document.querySelector(".tftable2 > tbody").children[13].children[1]
            .innerText;
        const subject12GPA =
          document.querySelector(".tftable2 > tbody").children[13].children[2]
            .innerText;

        result = [
          {
            subjectCode: subject1Code,
            subjectName: subject1Name,
            subjectGPA: subject1GPA,
          },
          {
            subjectCode: subject2Code,
            subjectName: subject2Name,
            subjectGPA: subject2GPA,
          },
          {
            subjectCode: subject3Code,
            subjectName: subject3Name,
            subjectGPA: subject3GPA,
          },
          {
            subjectCode: subject4Code,
            subjectName: subject4Name,
            subjectGPA: subject4GPA,
          },
          {
            subjectCode: subject5Code,
            subjectName: subject5Name,
            subjectGPA: subject5GPA,
          },
          {
            subjectCode: subject6Code,
            subjectName: subject6Name,
            subjectGPA: subject6GPA,
          },
          {
            subjectCode: subject7Code,
            subjectName: subject7Name,
            subjectGPA: subject7GPA,
          },
          {
            subjectCode: subject8Code,
            subjectName: subject8Name,
            subjectGPA: subject8GPA,
          },
          {
            subjectCode: subject9Code,
            subjectName: subject9Name,
            subjectGPA: subject9GPA,
          },
          {
            subjectCode: subject10Code,
            subjectName: subject10Name,
            subjectGPA: subject10GPA,
          },
          {
            subjectCode: subject11Code,
            subjectName: subject11Name,
            subjectGPA: subject11GPA,
            optional: true,
          },
          {
            subjectCode: subject12Code,
            subjectName: subject12Name,
            subjectGPA: subject12GPA,
            optional: true,
          },
        ];
      }

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
        eiin,
        result,
      };

      await saveToDB(dd);

      return dd;
    }, eiin);

    data.push(response);

    console.log("data scraped done");
    await page.waitForTimeout(500);
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
  console.log(dd?.roll);
};

// (async () => {
//   const d = ["183502", "183503", "183504"];
//   const response = await scrape(d);
//   fs.writeFile("result.txt", JSON.stringify(response), (err) => {
//     err && console.log(err);
//   });
// })();

const scrapeIndividualResult = async (data, eiin) => {
  // const res =
  await scrape(data, eiin);
  // fs.writeFile("result.txt", JSON.stringify(res), (err) => {
  //   err && console.log(err);
  // });
};

module.exports = scrapeIndividualResult;
