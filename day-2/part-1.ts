import fs from "fs";
import path from "path";
import url from "url";

const opponentPlays = {
  A: "rock",
  B: "paper",
  C: "scissors",
} as const;

const myPlays = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
} as const;

const whatBeats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
} as const;

const shapeScores = {
  rock: 1,
  paper: 2,
  scissors: 3,
} as const;

const outcomeScores = {
  lose: 0,
  draw: 3,
  win: 6,
} as const;

const input = fs.readFileSync(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "input.txt"),
  "utf8"
);
const inputArray = input.split(/\s/);

let [opponentScore, myScore] = [0, 0];
for (let i = 0; i < inputArray.length; i += 2) {
  const [opponentPlay, myPlay] = [
    opponentPlays[inputArray[i] as "A" | "B" | "C"],
    myPlays[inputArray[i + 1] as "X" | "Y" | "Z"],
  ] as const;

  opponentScore += shapeScores[opponentPlay];
  myScore += shapeScores[myPlay];

  if (opponentPlay === myPlay) {
    opponentScore += outcomeScores.draw;
    myScore += outcomeScores.draw;
  } else if (whatBeats[opponentPlay] === myPlay) {
    opponentScore += outcomeScores.win;
    myScore += outcomeScores.lose;
  } else if (whatBeats[myPlay] === opponentPlay) {
    opponentScore += outcomeScores.lose;
    myScore += outcomeScores.win;
  } else {
    throw new Error("Unexpected play");
  }
}

console.log(opponentScore, myScore);
