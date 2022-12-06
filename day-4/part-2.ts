import fs from "fs";
import path from "path";
import url from "url";

const input = fs.readFileSync(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
  "utf8"
);
const inputArray = input.split(/[\n,-]/);

let overlapCount = 0;
for (let i = 0; i < inputArray.length; i += 4) {
  const firstPair = [parseInt(inputArray[i]), parseInt(inputArray[i + 1])];
  const secondPair = [parseInt(inputArray[i + 2]), parseInt(inputArray[i + 3])];

  if (firstPair[0] <= secondPair[1] && secondPair[0] <= firstPair[1]) {
    overlapCount++;
  }
}

console.log(overlapCount);
