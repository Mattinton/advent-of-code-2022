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

const rows = input.split("\n");

const heightMap: number[][] = [];

let startCoord: [number, number];
let endCoord: [number, number];

// parse input
for (let y = 0; y < rows.length; y++) {
  const row = rows[y];

  const heightRow = [];
  heightMap.push(heightRow);

  const columns = row.split("");
  for (let x = 0; x < row.length; x++) {
    const column = columns[x];

    if (column === "S") {
      startCoord = [x, y];
      heightRow.push("a".charCodeAt(0) - 97);
    } else if (column === "E") {
      endCoord = [x, y];
      heightRow.push("z".charCodeAt(0) - 97);
    } else {
      const height = column.charCodeAt(0) - 97;
      heightRow.push(height);
    }
  }
}

const neighbourDirections = [
  [0, -1], // up
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
];

function getNeighbours(current: string) {
  const currentCoord = current.split(",").map((n) => parseInt(n));
  const [x, y] = currentCoord;

  const neighbours: string[] = [];
  for (const [dx, dy] of neighbourDirections) {
    const [nx, ny] = [x + dx, y + dy];

    if (heightMap[ny]?.[nx] == null) {
      continue;
    }

    if (heightMap[ny][nx] - heightMap[y][x] > 1) {
      continue;
    }

    neighbours.push(coordToString([nx, ny]));
  }
  return neighbours;
}

function coordToString([x, y]: [number, number]) {
  return `${x},${y}`;
}

// a* search
const start = coordToString(startCoord);
const end = coordToString(endCoord);

const nodes = new Map<string, { parent: string; cost: number }>([
  [start, { parent: null, cost: 0 }],
]);

let open = new Set([start]);
const closed = new Set<string>();

while (open.size > 0) {
  const [current, ...rest] = Array.from(open);
  open = new Set(rest);

  if (current === end) {
    const path = [];

    let parent = nodes.get(current).parent;
    while (parent != null) {
      path.push(parent);
      parent = nodes.get(parent).parent;
    }

    console.log(path.length);
    break;
  }

  closed.add(current);
  const neighbours = getNeighbours(current);

  for (const neighbour of neighbours) {
    if (closed.has(neighbour)) {
      continue;
    }

    const newCost = nodes.get(current).cost + 1;
    if (!open.has(neighbour)) {
      open.add(neighbour);
    } else if (newCost >= nodes.get(neighbour).cost) {
      continue;
    }

    nodes.set(neighbour, { parent: current, cost: newCost });
  }
}
