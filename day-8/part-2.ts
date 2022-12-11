import fs from "fs";
import path from "path";
import url from "url";

const input = fs
  .readFileSync(
    path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
    "utf8"
  )
  .trim();

const treeRows = input.split("\n");

const forestDimensions = [treeRows.length, treeRows[0].length];

let bestViewingScore = 0;
for (let y = 1; y < forestDimensions[0] - 1; y++) {
  for (let x = 1; x < forestDimensions[1] - 1; x++) {
    const treeHeight = parseInt(treeRows[y][x]);

    let up, right, bottom, left;
    let [
      upViewDistance,
      rightViewDistance,
      bottomViewDistance,
      leftViewDistance,
    ] = [0, 0, 0, 0];
    let [upContinue, rightContinue, bottomContinue, leftContinue] = [
      true,
      true,
      true,
      true,
    ];

    let diff = 1;

    do {
      up = treeRows[y - diff]?.[x];
      right = treeRows[y]?.[x + diff];
      bottom = treeRows[y + diff]?.[x];
      left = treeRows[y]?.[x - diff];

      upViewDistance += up && upContinue ? 1 : 0;
      rightViewDistance += right && rightContinue ? 1 : 0;
      bottomViewDistance += bottom && bottomContinue ? 1 : 0;
      leftViewDistance += left && leftContinue ? 1 : 0;

      upContinue = upContinue && up && parseInt(up) < treeHeight;
      rightContinue = rightContinue && right && parseInt(right) < treeHeight;
      bottomContinue =
        bottomContinue && bottom && parseInt(bottom) < treeHeight;
      leftContinue = leftContinue && left && parseInt(left) < treeHeight;

      diff++;
    } while (up || right || bottom || left);

    const viewingScore =
      upViewDistance *
      rightViewDistance *
      bottomViewDistance *
      leftViewDistance;

    if (viewingScore > bestViewingScore) bestViewingScore = viewingScore;
  }
}

console.log(bestViewingScore);
