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

const rockPaths = input.split("\n");

const cave = new Map<number, Map<number, "#" | "." | "+" | "o">>();

let caveMinX = Infinity;
let caveMaxX = -Infinity;

const caveMinY = 0;
let caveMaxY = -Infinity;

for (const path of rockPaths) {
  const [start, ...pathParts] = path
    .split(" -> ")
    .map((x) => x.split(",").map((y) => parseInt(y)));

  let [posX, posY] = start;
  do {
    const [targetX, targetY] = pathParts.shift();

    const minX = Math.min(posX, targetX);
    const maxX = Math.max(posX, targetX);

    const minY = Math.min(posY, targetY);
    const maxY = Math.max(posY, targetY);

    caveMinX = Math.min(caveMinX, minX);
    caveMaxX = Math.max(caveMaxX, maxX);

    caveMaxY = Math.max(caveMaxY, maxY);

    if (minX === maxX) {
      // vertical line
      for (let y = minY; y <= maxY; y++) {
        cave.set(minX, cave.get(minX) ?? new Map());
        cave.get(minX).set(y, cave.get(minX).get(y) ?? "#");
      }
    } else {
      for (let x = minX; x <= maxX; x++) {
        cave.set(x, cave.get(x) ?? new Map());
        cave.get(x).set(posY, cave.get(x).get(posY) ?? "#");
      }
    }

    [posX, posY] = [targetX, targetY];
  } while (pathParts.length > 0);
}

cave.set(500, cave.get(500) ?? new Map());
cave.get(500).set(0, "+");

const sand = [];
let currentSand = [500, 0];
while (currentSand[0] >= caveMinX && currentSand[0] <= caveMaxX) {
  const down = cave.get(currentSand[0])?.get(currentSand[1] + 1);
  const downLeft = cave.get(currentSand[0] - 1)?.get(currentSand[1] + 1);
  const downRight = cave.get(currentSand[0] + 1)?.get(currentSand[1] + 1);

  if (!down || down === ".") {
    currentSand[1]++;
    continue;
  }

  if (!downLeft || downLeft === ".") {
    currentSand[0]--;
    currentSand[1]++;
    continue;
  }

  if (!downRight || downRight === ".") {
    currentSand[0]++;
    currentSand[1]++;
    continue;
  }

  cave.set(currentSand[0], cave.get(currentSand[0]) ?? new Map());
  cave.get(currentSand[0]).set(currentSand[1], "o");

  sand.push(currentSand);
  currentSand = [500, 0];
}

for (let y = caveMinY; y <= caveMaxY; y++) {
  let row = "";
  for (let x = caveMinX; x <= caveMaxX; x++) {
    row += cave.get(x)?.get(y) ?? ".";
  }
  console.log(row);
}

console.log(sand.length);
