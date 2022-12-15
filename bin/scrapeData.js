const puppeteer = require("puppeteer");

const scrapeResult = async (data) => {
  const { examName, passingYear, boardName, roll, registration } = data;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://www.educationboardresults.gov.bd", {
    timeout: 0,
    waitUntil: "networkidle0",
  });
  await page.select("#exam", examName.toString());

  await page.select("#year", passingYear.toString());

  await page.select("#board", boardName.toString());

  await page.type("#roll", roll.toString());
  await page.type("#reg", registration.toString());

  const calculatedCaptcha = await page.evaluate(() => {
    const captcha = document.querySelector("fieldset > table > tbody")
      .children[6].children[1].innerText;
    const firstNumber = Number(captcha.split(" ")[0]);
    const lastNumber = Number(captcha.split(" ")[2]);
    const calculated = firstNumber + lastNumber;
    return calculated;
  });

  await page.type("#value_s", calculatedCaptcha.toString());

  await page.click("#button2", { delay: 500 });
  await page.waitForTimeout(500);

  const url = await page.url();

  const resultData = await page.evaluate((url) => {
    let resultData;

    if (url == "http://www.educationboardresults.gov.bd/result.php") {
      const exam_name = document.querySelector(".black16bold").innerText;
      const roll =
        document.querySelector(".black12 > tbody").children[0].children[1]
          .innerText;
      const name =
        document.querySelector(".black12 > tbody").children[0].children[3]
          .innerText;
      const board =
        document.querySelector(".black12 > tbody").children[1].children[1]
          .innerText;

      const fathers_name =
        document.querySelector(".black12 > tbody").children[1].children[3]
          .innerText;

      const group =
        document.querySelector(".black12 > tbody").children[2].children[1]
          .innerText;

      const mothers_name =
        document.querySelector(".black12 > tbody").children[2].children[3]
          .innerText;
      const type =
        document.querySelector(".black12 > tbody").children[3].children[1]
          .innerText;

      const date_of_birth =
        document.querySelector(".black12 > tbody").children[3].children[3]
          .innerText;

      const result =
        document.querySelector(".black12 > tbody").children[4].children[1]
          .innerText;

      const institute =
        document.querySelector(".black12 > tbody").children[4].children[3]
          .innerText;
      const gpa =
        document.querySelector(".black12 > tbody").children[5].children[1]
          .innerText;

      const table = document.querySelector(
        "body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td > table > tbody"
      ).children;

      let gradeSheet = [];

      for (let result of table) {
        const code = result.children[0].innerText;
        const subject = result.children[1].innerText;
        const grade = result.children[2].innerText;
        gradeSheet.push({ code, subject, grade });
      }

      gradeSheet.length > 0 && gradeSheet.shift();

      resultData = {
        exam_name,
        roll,
        name,
        fathers_name,
        board,
        group,
        mothers_name,
        type,
        date_of_birth,
        result,
        institute,
        gpa,
        gradeSheet,
      };
    } else {
      resultData = "no Data Found";
    }
    return resultData;
  }, url);

  console.clear();
  console.log(`
             ${resultData.exam_name}

 Roll   : ${resultData.roll}    Name          : ${resultData.name}
 Board  : ${resultData.board}   Father's Name : ${resultData.fathers_name}
 Group  : ${resultData.group}   Mother's Name : ${resultData.mothers_name}
 Type   : ${resultData.type}   Date of Birth : ${resultData.date_of_birth}
 Result : ${resultData.result}    Institute     : ${resultData.institute}
 GPA    : ${resultData.gpa}
`);
  console.log("\t\t\t\tGrade Sheet");
  console.table(resultData.gradeSheet);

  browser.close();
  return resultData;
};

// (async () => {
//   const data = {
//     examName: "ssc",
//     passingYear: "2022",
//     boardName: "comilla",
//     roll: "161343",
//     registration: "1911192938",
//   };

//   await scrapeResult(data);
// })();

module.exports = scrapeResult;
