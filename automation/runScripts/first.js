const scrapeSchoolFull = require("../sscResultSchollWise");

const schoolLIst = [
  {
    id: 36,
    EIIN: "103208",
    schoolName: "SHALGAON KALISHIMA SCHOOL AND COLLEGE",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
  {
    id: 37,
    EIIN: "103209",
    schoolName: "ISLAMPUR ALHAJ KAZI RAFIQUL ISLAM HIGH SCHOOL AND COLLEGE",
    zilla: "BRAHMANBARIA",
    upazila: "BIJOYNAGAR",
  },
  {
    id: 38,
    EIIN: "103210",
    schoolName: "ANNADA GOVT. HIGH SCHOOL, BRAHMANBARIA",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
  {
    id: 39,
    EIIN: "103211",
    schoolName: "BRAHMANBARIA HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
];

(async () => {
  for (const data of schoolLIst) {
    await scrapeSchoolFull(data?.EIIN);
  }
})();
