import fs from "fs";
import path from "path";
import url from "url";

const input = fs.readFileSync(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
  "utf8"
);
const inputArray = input.split(/\n/);

let prioritySum = 0;
for (let i = 0; i < inputArray.length; i += 3) {
  const rucksacks = [inputArray[i], inputArray[i + 1], inputArray[i + 2]];
  const rucksackSets = rucksacks.map((rucksack) => new Set(rucksack.split("")));

  const intersection = Array.from(rucksackSets[0]).filter(
    (x) => rucksackSets[1].has(x) && rucksackSets[2].has(x)
  );

  for (const char of intersection) {
    let code = char.charCodeAt(0);
    if (code > 96 && code < 123) code -= 96; // a - z
    else if (code > 64 && code < 91) code -= 38; // A - Z
    prioritySum += code;
  }
}

console.log(prioritySum);
