const scrapeSchoolFull = require("../sscResultSchollWise");

const schoolLIst = [
  {
    id: 1,
    EIIN: "103149",
    schoolName: "GOLKHAR RANI KHAR HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
  {
    id: 2,
    EIIN: "103150",
    schoolName: "NURPUR RUTI ABDUL HAQUE BHUIYA HIGH SCHOOL",
    zilla: "BRAHMANBARIA",
    upazila: "AKHAURA",
  },
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
];

(async () => {
  for (const data of schoolLIst) {
    await scrapeSchoolFull(data?.EIIN);
  }
})();
