#!/usr/bin/env node
const { prompt, AutoComplete } = require("enquirer");
const scrapeResult = require("./scrapeData");

// console.log("Hello!");

console.log(
  "\r\n_____________________________  _______________   ___________________________ \r\n___  __ \\__  ____/_  ___/_  / / /__  /___  __/   ___  __/_  __ \\_  __ \\__  / \r\n__  /_/ /_  __/  _____ \\_  / / /__  / __  /      __  /  _  / / /  / / /_  /  \r\n_  _, _/_  /___  ____/ // /_/ / _  /___  /       _  /   / /_/ // /_/ /_  /___\r\n/_/ |_| /_____/  /____/ \\____/  /_____/_/        /_/    \\____/ \\____/ /_____/\r\n                                                                             \r\n"
);

(async () => {
  const examCredential = [
    {
      type: "select",
      name: "exam",
      message: "Exam Type ?",
      initial: 1,
      choices: [
        { name: "jsc", message: "JSC/JDC", value: "jsc" }, //<= choice object
        {
          name: "ssc",
          message: "SSC/Dakhil/Equivalent",
          value: "ssc",
        }, //<= choice object
        {
          name: "ssc_voc",
          message: "SSC(Vocational)",
          value: "ssc_voc",
        },
        {
          name: "hsc",
          message: "HSC/Alim",
          value: "hsc",
        },
        {
          name: "hsc_hbm",
          message: "HSC(BM)",
          value: "hsc_hbm",
        },
        {
          name: "hsc_dic",
          message: "Diploma in Commerce",
          value: "hsc_dic",
        },
        {
          name: "hsc",
          message: "Diploma in Business Studies",
          value: "hsc",
        },
      ],
    },
  ];
  const yearList = [
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
  ];
  const boardCred = [
    {
      type: "select",
      name: "board",
      message: "What is your Board Name ?",
      initial: 2,
      choices: [
        { name: "barisal", message: "Barisal", value: "barisal" }, //<= choice object
        {
          name: "chittagong",
          message: "Chittagong",
          value: "chittagong",
        }, //<= choice object
        {
          name: "comilla",
          message: "Comilla",
          value: "comilla",
        },
        {
          name: "dhaka",
          message: "Dhaka",
          value: "dhaka",
        },
        {
          name: "dinajpur",
          message: "Dinajpur",
          value: "dinajpur",
        },
        {
          name: "jessore",
          message: "Jessore",
          value: "jessore",
        },
        {
          name: "mymensingh",
          message: "Mymensingh",
          value: "mymensingh",
        },
        {
          name: "rajshahi",
          message: "Rajshahi",
          value: "rajshahi",
        },
        {
          name: "sylhet",
          message: "Sylhet",
          value: "sylhet",
        },
        {
          name: "madrasah",
          message: "Madrasah",
          value: "madrasah",
        },
        {
          name: "technical",
          message: "Technical",
          value: "tec",
        },
        {
          name: "dibs",
          message: "DIBS(Dhaka)",
          value: "dibs",
        },
      ],
    },
  ];
  const yearSelect = new AutoComplete({
    name: "year",
    message: "Passing Year",
    limit: 10,
    initial: 0,
    choices: yearList,
  });

  const selectedExam = await prompt(examCredential);
  const examName = selectedExam.exam;

  const passingYear = await yearSelect.run();

  const boardSelect = await prompt(boardCred);
  const boardName = boardSelect.board;

  const response = await prompt([
    {
      type: "input",
      name: "roll",
      message: "What is your Exam Roll?",
    },
    {
      type: "input",
      name: "registration",
      message: "What is your Registration Number?",
    },
  ]);
  const { roll, registration } = response;

  const requiredData = {
    examName,
    passingYear,
    boardName,
    roll,
    registration,
  };

  if (roll.length === 6 && registration.length === 10) {
    await scrapeResult(requiredData);
  } else {
    console.log("\t\tInput Valid Roll & Registration Number");
  }
})();
