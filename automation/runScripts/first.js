const scrapeSchoolFull = require("../sscResultSchollWise");

const schoolLIst = [
  {
    id: 3,
    EIIN: "103151",
    schoolName: "BANGLADESH RAILWAY GOVT. HIGH SCHOOL, AKHAURA",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 4,
    EIIN: "103152",
    schoolName: "AKHAURA NASRIN NABI PILOT GIRLS' HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 5,
    EIIN: "103153",
    schoolName: "SHAHPIR KALLA SHAHID HIGH SCHOOL, AKHAURA",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 6,
    EIIN: "103154",
    schoolName: "DEBGRAM GOVERNMENT PILOT HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
];

(async () => {
  for (const data of schoolLIst) {
    await scrapeSchoolFull(data?.EIIN);
  }
})();
