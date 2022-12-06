import fs from "fs";
import path from "path";
import url from "url";

const input = fs.readFileSync(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
  "utf8"
);
const inputArray = input.split(/\n/);

let prioritySum = 0;
for (const rucksack of inputArray) {
  const halfRucksack = Math.floor(rucksack.length / 2);

  const [comp1Set, comp2Set] = [
    new Set(rucksack.substring(0, halfRucksack).split("")),
    new Set(rucksack.substring(halfRucksack).split("")),
  ];

  const intersection = Array.from(comp1Set).filter((x) => comp2Set.has(x));

  for (const char of intersection) {
    let code = char.charCodeAt(0);
    if (code > 96 && code < 123) code -= 96; // a - z
    else if (code > 64 && code < 91) code -= 38; // A - Z
    prioritySum += code;
  }
}

console.log(prioritySum);
