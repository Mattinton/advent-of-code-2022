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

const packetsString = input.split(/\s+/);

type Packet = number | Packet[];

function compare(a: Packet, b: Packet): 1 | 0 | -1 {
  if (typeof a === "number" && typeof b === "number") {
    return a === b ? 0 : a < b ? -1 : 1;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length; i++) {
      if (b[i] == null) return 1;
      const comparison = compare(a[i], b[i]);

      if (comparison !== 0) return comparison;
    }
    return compare(a.length, b.length);
  }

  return compare(
    typeof a === "number" ? [a] : a,
    typeof b === "number" ? [b] : b
  );
}

const packets = packetsString.map((packetString) =>
  JSON.parse(packetString)
) as Packet[];
packets.push([[2]]);
packets.push([[6]]);

packets.sort(compare);

let product = 1;
for (const packet of packets) {
  if (
    JSON.stringify(packet) === JSON.stringify([[2]]) ||
    JSON.stringify(packet) === JSON.stringify([[6]])
  ) {
    product *= packets.indexOf(packet) + 1;
  }
}

console.log(product);
