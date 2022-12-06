import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

let [currentCalories, bestCalories] = [0, [0, 0, 0]];
for (const caloriesStr of inputArray) {
  if (caloriesStr === "") {
    let i = 0;
    while (currentCalories > bestCalories[i]) {
      if (i > 0) {
        bestCalories[i - 1] = bestCalories[i];
        bestCalories[i] = currentCalories;
      }
      i += 1;
    }

    currentCalories = 0;
    continue;
  }

  const calories = parseInt(caloriesStr);
  currentCalories += calories;
}

console.log(bestCalories.reduce((a, b) => a + b, 0));
