// var request = require("request");
// const fetch = require("node-fetch");

const fetch = require("node-fetch"); //npm install node-fetch
const requestData = {
  EIIN: 11433,
  name: "comilla victoriya college",
  zilla: "COMILLA",
  upazila: "CUMILLA ADARSHA SADAR",
};

const aa = [1, 2, 3, 4, 5];

for (let a of aa) {
  // fetch("http://localhost:5000/school", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(requestData),
  // })
  //   .then((u) => {
  //     return u.json();
  //   })
  //   .then((j) => {
  //     console.log(j);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}

(async () => {
  const res = await fetch("http://localhost:5000/school", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });
  const data = await res.json();
  console.log(data);
})();
