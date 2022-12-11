import fs from "fs";
import path from "path";
import url from "url";

const input = fs.readFileSync(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
  "utf8"
);

const terminal = input.split("\n");

let cwd: string;
const directories = new Map<string, number>();

for (const line of terminal) {
  if (line.startsWith("$ cd")) {
    const to = line.replace("$ cd ", "");
    cwd = cwd ? path.join(cwd, to) : to;
  } else {
    const match = line.match(/^[0-9]+/);
    if (!match) continue;

    // shame about this while loop but i can't think of a better way
    // to sum up the sizes for all the parent directories
    let dir = cwd;
    while (dir != "/") {
      directories.set(dir, (directories.get(dir) ?? 0) + parseInt(match[0]));
      dir = path.dirname(dir);
    }
    directories.set(dir, (directories.get(dir) ?? 0) + parseInt(match[0]));
  }
}

let totalSum = 0;
for (const [_dir, size] of directories) {
  if (size <= 100000) totalSum += size;
}
console.log(totalSum);
