const str = "adb(fsf)";
const refined = str.replace(/\s*\(.*?\)\s*/g, "");

console.log(refined);
