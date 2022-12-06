const scrapeSchoolFull = require("../sscResultSchollWise");

const schoolLIst = [
  {
    id: 11,
    EIIN: "103159",
    schoolName: "KARMAMOTH HIGH SCHOOL, KARMA MOTH",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 12,
    EIIN: "103161",
    schoolName: "CHHOYGHARIA AL-HAJ SHAH ALAM HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 13,
    EIIN: "103162",
    schoolName: "AMODABAD ALHAJ SHAH ALAM HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 14,
    EIIN: "103170",
    schoolName: "CHHATURA CHANDPUR SCHOOL AND COLLEGE",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 15,
    EIIN: "103171",
    schoolName: "DARIKANDI BADDA ASMATUNNESA HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "BANCHHARAMPUR",
  },
];

(async () => {
  for (const data of schoolLIst) {
    await scrapeSchoolFull(data?.EIIN);
  }
})();
