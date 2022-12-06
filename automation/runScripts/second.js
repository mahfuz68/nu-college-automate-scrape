const scrapeSchoolFull = require("../sscResultSchollWise");

const schoolList = [
  {
    id: 8,
    EIIN: "103156",
    schoolName: "TULAI SHIMUL HIGH SCHOOL, COLONEL BAZAR",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 9,
    EIIN: "103157",
    schoolName: "HIRAPUR SHAHID NOWAB MEMORIAL HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 10,
    EIIN: "103158",
    schoolName:
      "RANIKHAR S. A. HANNAN BOHUMUKHI AND KARIGARI HIGH SCHOOL, GHOLKHAR",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 11,
    EIIN: "103159",
    schoolName: "KARMAMOTH HIGH SCHOOL, KARMA MOTH",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
];

(async () => {
  for (const data of schoolList) {
    await scrapeSchoolFull(data?.EIIN);
  }
})();
