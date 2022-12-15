const scrapeSchoolFull = require("../sscResultSchollWise");

const schoolLIst = [
  {
    id: 44,
    EIIN: "103216",
    schoolName: "SABERA SOBHAN GOVT. GIRLS' HIGH SCHOOL, BRAHMANBARIA",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
  {
    id: 45,
    EIIN: "103217",
    schoolName: "ANANDAMOYI GIRLS' HIGH SCHOOL, BRAHMANBARIA",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
  {
    id: 46,
    EIIN: "103218",
    schoolName: "NIAZ MOHAMMAD HIGH SCHOOL, BRAHMANBARIA",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
  {
    id: 47,
    EIIN: "103220",
    schoolName: "BADHUGHAR MAHBUBUL HUDA HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "BRAHMANBARIA SADAR",
  },
];

(async () => {
  for (const data of schoolLIst) {
    await scrapeSchoolFull(data?.EIIN);
  }
})();
