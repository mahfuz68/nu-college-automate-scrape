const puppeteer = require("puppeteer");
const fs = require("fs");

const scrape = async (rData) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://result19.comillaboard.gov.bd/SSC22/individual/");

  let data = [];

  for (const roll of rData) {
    await page.type("#roll", roll);
    await page.click(".button2");
    const response = await page.evaluate(() => {
      const Roll = document.querySelector("tbody > tr").children[1].innerText;
      const Name = document.querySelector("tbody > tr").children[3].innerText;
      const Board =
        document.querySelector("tbody").children[1].children[1].innerText;
      const FathersName =
        document.querySelector("tbody").children[1].children[3].innerText;

      const Group =
        document.querySelector("tbody").children[2].children[1].innerText;
      const MothersName =
        document.querySelector("tbody").children[2].children[3].innerText;
      const Type =
        document.querySelector("tbody").children[3].children[1].innerText;
      const Institute =
        document.querySelector("tbody").children[3].children[3].innerText;
      const GPA =
        document.querySelector("tbody").children[4].children[3].innerText;
      const subject1Code =
        document.querySelector(".tftable2 > tbody").children[1].children[0]
          .innerText;
      const subject1Name =
        document.querySelector(".tftable2 > tbody").children[1].children[1]
          .innerText;
      const subject1GPA =
        document.querySelector(".tftable2 > tbody").children[1].children[2]
          .innerText;

      return {
        Roll,
        Name,
        Board,
        FathersName,
        Group,
        MothersName,
        Type,
        Institute,
        GPA,
        subject1Code,
        subject1Name,
        subject1GPA,
      };
    });

    data.push(response);
    await page.goBack();
  }

  await page.screenshot({ path: "image/screenshot.png", fullPage: true });

  await browser.close();
  return data;
};

(async () => {
  const d = ["183502", "183503", "183504"];
  const response = await scrape(d);
  fs.writeFile("result.txt", JSON.stringify(response), (err) => {
    err && console.log(err);
  });
})();
