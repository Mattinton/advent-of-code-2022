import fs from "fs";
import path from "path";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import url from "url";

const input = fs
  .readFileSync(
    path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
    "utf8"
  )
  .trim();

const pairs = input.split("\n\n");

type Packet = number | Packet[];

function compare(a: Packet, b: Packet): boolean {
  function recursiveCompare(a: Packet, b: Packet): 1 | 0 | -1 {
    if (typeof a === "number" && typeof b === "number") {
      return a === b ? 0 : a < b ? -1 : 1;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      for (let i = 0; i < a.length; i++) {
        if (b[i] == null) return 1;
        const comparison = recursiveCompare(a[i], b[i]);

        if (comparison !== 0) return comparison;
      }
      return recursiveCompare(a.length, b.length);
    }

    return recursiveCompare(
      typeof a === "number" ? [a] : a,
      typeof b === "number" ? [b] : b
    );
  }

  return recursiveCompare(a, b) === -1;
}

let sum = 0;
for (let i = 0; i < pairs.length; i++) {
  const pair = pairs[i];

  const [first, second] = pair.split("\n").map((line) => JSON.parse(line)) as [
    Packet,
    Packet
  ];

  if (compare(first, second)) {
    sum += i + 1;
  }
}

console.log(sum);
