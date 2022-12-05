const puppeteer = require("puppeteer");
const fetch = require("node-fetch");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://google.com/");
  const requestData = {
    EIIN: 3232,
    name: "comilla victoriya",
    zilla: "COMILLA",
    upazila: "CUMILLA ADARSHA SADAR",
  };

  const res = await fetch("http://localhost:5000/school", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const dd = await res.json();
  console.log(dd);

  await page.screenshot({ path: "ss.png" });
  browser.close();
})();
const dd = {
  title: "foo",
  body: "bar",
  userId: 1,
};

const requestData = {
  EIIN: 3232,
  name: "comilla victoriya",
  zilla: "COMILLA",
  upazila: "CUMILLA ADARSHA SADAR",
};
// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   body: JSON.stringify(requestData),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
