import fs from "fs";
import path from "path";
import url from "url";

const input = fs
  .readFileSync(
    path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
    "utf8"
  )
  .trim();

const moveRows = input.split("\n");

const knotPositions: [number, number][] = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

const tailPositions = [];

for (const row of moveRows) {
  const [move, value] = row.split(" ") as ["L" | "D" | "R" | "U", string];
  const distance = parseInt(value);

  for (let i = 0; i < distance; i++) {
    const [headPosition, ...restPositions] = knotPositions;

    switch (move) {
      case "L":
        headPosition[0] -= 1;
        break;
      case "D":
        headPosition[1] -= 1;
        break;
      case "R":
        headPosition[0] += 1;
        break;
      case "U":
        headPosition[1] += 1;
        break;
    }

    let previousKnotPosition = headPosition;
    for (const knotPosition of restPositions) {
      const diff = [
        previousKnotPosition[0] - knotPosition[0],
        previousKnotPosition[1] - knotPosition[1],
      ];

      if (Math.abs(diff[0]) > 1 || Math.abs(diff[1]) > 1) {
        knotPosition[0] += Math.sign(diff[0]);
        knotPosition[1] += Math.sign(diff[1]);
      }

      previousKnotPosition = knotPosition;
    }

    tailPositions.push(JSON.stringify(previousKnotPosition));
  }
}

console.log(new Set(tailPositions).size);
