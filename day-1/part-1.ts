import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const inputArray = input.split("\n");

let [currentCalories, bestCalories] = [0, 0];
for (const caloriesStr of inputArray) {
  if (currentCalories > bestCalories) {
    bestCalories = currentCalories;
  }

  if (caloriesStr === "") {
    currentCalories = 0;
    continue;
  }

  const calories = parseInt(caloriesStr);
  currentCalories += calories;
}

console.log(bestCalories);
