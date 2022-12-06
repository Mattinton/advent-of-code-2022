import fs from "fs";
import path from "path";
import url from "url";

const input = fs.readFileSync(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
  "utf8"
);
const inputArray = input.split(/[\n,-]/);

let fullyContainsCount = 0;
for (let i = 0; i < inputArray.length; i += 4) {
  const firstPair = [parseInt(inputArray[i]), parseInt(inputArray[i + 1])];
  const secondPair = [parseInt(inputArray[i + 2]), parseInt(inputArray[i + 3])];

  const leftDifference = firstPair[0] - secondPair[0];
  const rightDifference = firstPair[1] - secondPair[1];

  if (
    (leftDifference <= 0 && rightDifference >= 0) ||
    (leftDifference >= 0 && rightDifference <= 0)
  ) {
    fullyContainsCount++;
  }
}

console.log(fullyContainsCount);
