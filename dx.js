const cc = [
  { code: "101", subject: "BENGALI", grade: "A+" },
  { code: "107", subject: "ENGLISH", grade: "A+" },
  { code: "109", subject: "MATHEMATICS", grade: "A+" },
  {
    code: "150",
    subject: "BANGLADESH AND GLOBAL STUDIES",
    grade: "A+",
  },
  {
    code: "112",
    subject: "HINDU RELIGION AND MORAL EDUCATION",
    grade: "A+",
  },
  { code: "136", subject: "PHYSICS", grade: "A+" },
  { code: "137", subject: "CHEMISTRY", grade: "A+" },
  { code: "138", subject: "BIOLOGY", grade: "A+" },
  {
    code: "154",
    subject: "INFORMATION AND COMMUNICATION TECHNOLOGY",
    grade: "A+",
  },
  { code: "126", subject: "HIGHER MATHEMATICS", grade: "A+" },
  {
    code: "147",
    subject: "PHYSICAL EDUCATION, HEALTH & SPORTS",
    grade: "A+",
  },
  { code: "156", subject: "CAREER EDUCATION", grade: "A+" },
];

const resultData = {
  exam_name: "SSC/Dakhil/Equivalent Result 2022",
  roll: "161343",
  name: "TOMPA RANI SHARKAR",
  fathers_name: "LITON CHANDRA SHARKAR",
  board: "cumilla",
  group: "SCIENCE",
  mothers_name: "KAKALI RANI SHARKAR",
  type: "REGULAR",
  date_of_birth: "17-02-2006",
  result: "PASSED",
  institute: "DOLLAI NOWABPUR GIRLS HIGH SCHOOL",
  gpa: "5.00",
};

console.log(`
            ${resultData.exam_name}

Roll   : ${resultData.roll}   Name          : ${resultData.name}
Board  : ${resultData.board}  Father's Name : ${resultData.fathers_name}
Group  : ${resultData.group}  Mother's Name : ${resultData.mothers_name}
Type   : ${resultData.type}   Date of Birth : ${resultData.date_of_birth}
Result : ${resultData.result} Institute     : ${resultData.institute}
GPA    : ${resultData.gpa}
`);

console.log("\t\t\t\tGrade Sheet");

console.table(cc);
