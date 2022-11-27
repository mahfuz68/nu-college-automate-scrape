const puppeteer = require("puppeteer");
const debug = require("debug")("scraper");
const fs = require("fs");
const bull = require("bull");
// const { queue } = require("bullmq");
// const nuQueue = new queue("nu");

const queue = new bull("nu");

queue.process(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://www.nubd.info/college/college_details.php");

  await page.screenshot({ path: `images/nuScreenshot${Date.now()}.png` });
  await browser.close();
});

queue.add({}, { repeat: { count: 5 } });
