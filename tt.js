const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("http://books.toscrape.com/");
  const data = await page.evaluate(() => {
    let data = [];
    let elements = document.querySelectorAll(".product_pod");

    for (var element of elements) {
      let title = element.children[2].innerText;
      let price = element.children[3].children[0].innerText;

      data.push({ title, price });
    }
    return data;
  });

  console.log(data);

  await browser.close();
})();
