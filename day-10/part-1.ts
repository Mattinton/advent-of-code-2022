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

const operations = input.split("\n");

const operationDurations = {
  addx: 1,
  noop: 0,
};

let tick = 0;
let x = 1;
let [operationIndex, operationTime] = [0, 0];

const signalStrengths = new Map<number, number>();
const recordSignalStrengthsAt = new Set([20, 60, 100, 140, 180, 220]);

while (operationIndex < operations.length) {
  const [operation, maybeAmount] = operations[operationIndex].split(/\s/);

  if (recordSignalStrengthsAt.has(tick + 1)) {
    signalStrengths.set(tick + 1, x * (tick + 1));
  }

  if (operationTime >= operationDurations[operation]) {
    if (operation === "addx") {
      x += parseInt(maybeAmount);
    }

    operationIndex++;
    operationTime = 0;
  } else {
    operationTime++;
  }

  tick++;
}

console.log(
  Array.from(signalStrengths.entries()).reduce((a, b) => a + b[1], 0)
);
