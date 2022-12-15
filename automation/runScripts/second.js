const scrapeSchoolFull = require("../sscResultSchollWise");

const schoolList = [
  {
    id: 40,
    EIIN: "103212",
    schoolName: "BRAHMANBARIA IDEAL HIGH ACADEMY",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
  {
    id: 41,
    EIIN: "103213",
    schoolName: "GOVERNMENT HAZI ABDUL JALIL HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "ASHUGANJ",
  },
  {
    id: 42,
    EIIN: "103214",
    schoolName: "ROWSHAN ARA JALIL GIRLS' HIGH SCHOOL, ASHUGONJ",
    zilla: "BRAHMANBARIA",
    upazila: "ASHUGANJ",
  },
  {
    id: 43,
    EIIN: "103215",
    schoolName: "RAMKANAI HIGH SCHOOL, BRAHMANBARIA",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
];

(async () => {
  for (const data of schoolList) {
    await scrapeSchoolFull(data?.EIIN);
  }
})();
