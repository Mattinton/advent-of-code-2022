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

const crtWidth = 40;

let tick = 0;
let spriteCenter = 1;
let [operationIndex, operationTime] = [0, 0];

let crtRow = "";

while (operationIndex < operations.length) {
  const [operation, maybeAmount] = operations[operationIndex].split(/\s/);

  const currentPixel = tick % crtWidth;
  if (currentPixel >= spriteCenter - 1 && currentPixel <= spriteCenter + 1) {
    crtRow += "#";
  } else {
    crtRow += ".";
  }

  if (operationTime >= operationDurations[operation]) {
    if (operation === "addx") {
      spriteCenter += parseInt(maybeAmount);
    }

    operationIndex++;
    operationTime = 0;
  } else {
    operationTime++;
  }

  if (currentPixel === crtWidth - 1) {
    console.log(crtRow);
    crtRow = "";
  }

  tick++;
}
