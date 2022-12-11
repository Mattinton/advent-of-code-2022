import fs from "fs";
import path from "path";
import url from "url";

const input = fs.readFileSync(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
  "utf8"
);

for (let i = 0; i < input.length; i++) {
  const four = input.substring(i, i + 14);
  const set = new Set(four.split(""));
  if (set.size === 14) {
    console.log(i + 14, four);
    break;
  }
}
