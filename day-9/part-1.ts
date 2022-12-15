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

const headPosition = [0, 0];
const tailPosition = [0, 0];

const tailPositions = [];

for (const row of moveRows) {
  const [move, value] = row.split(" ") as ["L" | "D" | "R" | "U", string];
  const distance = parseInt(value);

  for (let i = 0; i < distance; i++) {
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

    const diff = [
      headPosition[0] - tailPosition[0],
      headPosition[1] - tailPosition[1],
    ];

    if (Math.abs(diff[0]) > 1 || Math.abs(diff[1]) > 1) {
      tailPosition[0] += Math.sign(diff[0]);
      tailPosition[1] += Math.sign(diff[1]);
    }

    tailPositions.push(JSON.stringify(tailPosition));
  }
}

console.log(new Set(tailPositions).size);
