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

const monkeyRows = input.split("\n\n");

type Monkey = {
  itemWorryLevels: number[];
  worryLevelOperation: string;
  divideByDecision: number;
  ifTrueThrowTo: number;
  ifFalseThrowTo: number;
  inspectedItemsCount: number;
};

const monkeys = new Map<number, Monkey>();

for (const monkeyRow of monkeyRows) {
  const [monkeyNum, startingItems, operation, test, testTrue, testFalse] =
    monkeyRow.split(/\s*\n\s*/);

  const monkey = {
    itemWorryLevels: startingItems
      .replace("Starting items:", "")
      .trim()
      .split(", ")
      .map((item) => parseInt(item)),
    worryLevelOperation: operation.replace("Operation: new =", "").trim(),
    divideByDecision: parseInt(test.replace("Test: divisible by", "").trim()),
    ifTrueThrowTo: parseInt(
      testTrue.replace("If true: throw to monkey", "").trim()
    ),
    ifFalseThrowTo: parseInt(
      testFalse.replace("If false: throw to monkey", "").trim()
    ),
    inspectedItemsCount: 0,
  };

  monkeys.set(parseInt(monkeyNum.match(/\d+/)[0]), monkey);
}

for (let round = 0; round < 20; round++) {
  for (const [_monkeyNum, monkey] of monkeys.entries()) {
    while (monkey.itemWorryLevels.length > 0) {
      monkey.inspectedItemsCount++;

      const worryLevel = monkey.itemWorryLevels.shift();

      const newWorryLevel = Math.floor(
        eval(
          monkey.worryLevelOperation.replaceAll("old", worryLevel.toString())
        ) / 3
      );

      if (newWorryLevel % monkey.divideByDecision === 0) {
        monkeys.get(monkey.ifTrueThrowTo).itemWorryLevels.push(newWorryLevel);
      } else {
        monkeys.get(monkey.ifFalseThrowTo).itemWorryLevels.push(newWorryLevel);
      }
    }
  }
}

const monkeysArray = Array.from(monkeys.values());
monkeysArray.sort((a, b) => b.inspectedItemsCount - a.inspectedItemsCount);

console.log(
  monkeysArray[0].inspectedItemsCount * monkeysArray[1].inspectedItemsCount
);
