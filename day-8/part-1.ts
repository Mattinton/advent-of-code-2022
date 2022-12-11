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

let visibleTrees = forestDimensions[0] * 2 + forestDimensions[1] * 2 - 4;
for (let y = 1; y < forestDimensions[0] - 1; y++) {
  for (let x = 1; x < forestDimensions[1] - 1; x++) {
    const treeHeight = parseInt(treeRows[y][x]);

    let up, right, bottom, left;
    let [upVisible, rightVisible, bottomVisible, leftVisible] = [
      true,
      true,
      true,
      true,
    ];

    let visible = true;
    let diff = 1;

    // this is definitely not optimal but i don't have the brain power to
    // figure out a better solution right now

    // these could also be prettier with some inner loops but they're not as fast
    do {
      up = treeRows[y - diff]?.[x];
      right = treeRows[y]?.[x + diff];
      bottom = treeRows[y + diff]?.[x];
      left = treeRows[y]?.[x - diff];

      upVisible = upVisible && (!up || parseInt(up) < treeHeight);
      rightVisible = rightVisible && (!right || parseInt(right) < treeHeight);
      bottomVisible =
        bottomVisible && (!bottom || parseInt(bottom) < treeHeight);
      leftVisible = leftVisible && (!left || parseInt(left) < treeHeight);

      visible = upVisible || rightVisible || bottomVisible || leftVisible;

      diff++;
    } while (visible && (up || right || bottom || left));

    if (visible) visibleTrees++;
  }
}

console.log(visibleTrees);
