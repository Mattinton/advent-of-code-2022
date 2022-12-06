import fs from "fs";
import path from "path";
import url from "url";

const opponentPlays = {
  A: "rock",
  B: "paper",
  C: "scissors",
} as const;

const gameEnds = {
  X: "lose",
  Y: "draw",
  Z: "win",
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
  const [opponentPlay, gameEnd] = [
    opponentPlays[inputArray[i] as "A" | "B" | "C"],
    gameEnds[inputArray[i + 1] as "X" | "Y" | "Z"],
  ] as const;

  let myPlay: "rock" | "paper" | "scissors";
  if (gameEnd === "draw") {
    myPlay = opponentPlay;
  } else if (gameEnd === "lose") {
    myPlay = whatBeats[opponentPlay];
  } else if (gameEnd === "win") {
    myPlay = whatBeats[whatBeats[opponentPlay]];
  } else {
    throw new Error("Unexpected game end");
  }

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
