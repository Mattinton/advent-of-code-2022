import fs from "fs";
import path from "path";
import url from "url";

const input = fs.readFileSync(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
  "utf8"
);

const [gridInput, movesInput] = input.split(/\n\n/);

const gridRows = gridInput.split(/\n/);

const numCols = gridRows.pop().trim().split(/\s+/g).length;
const gridInputWithoutCols = gridRows.join("\n");

let grid: (string | null)[][] = [];
for (let i = 1; i < gridInputWithoutCols.length; i += 4) {
  const col = Math.floor(i / 4) % numCols;
  const column = grid[col] || [];

  const crate = gridInputWithoutCols[i].trim();
  if (crate) column.unshift(crate);

  grid[col] = column;
}

const moves = movesInput
  .replace(/[a-z]+\s/g, "")
  .trim()
  .split(/\s/);

for (let i = 0; i < moves.length; i += 3) {
  const [move, from, to] = [
    parseInt(moves[i]),
    parseInt(moves[i + 1]),
    parseInt(moves[i + 2]),
  ];

  const toMove = grid[from - 1].splice(grid[from - 1].length - move);
  grid[to - 1].push(...toMove.reverse());
}

console.log(grid.map((x) => x[x.length - 1]).join(""));
