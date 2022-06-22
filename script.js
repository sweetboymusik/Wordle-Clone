"use strict";

// Game Data
const wordList = [
  "about",
  "these",
  "films",
  "bring",
  "woods",
  "those",
  "event",
];

//Constants
const gray = "#818384";
const darkGray = "#3a3a3c";
const green = "#538d4e";
const yellow = "#b59f3b";

const keyboardArr = [
  document.querySelector(".q"),
  document.querySelector(".w"),
  document.querySelector(".e"),
  document.querySelector(".r"),
  document.querySelector(".t"),
  document.querySelector(".y"),
  document.querySelector(".u"),
  document.querySelector(".i"),
  document.querySelector(".o"),
  document.querySelector(".p"),
  document.querySelector(".a"),
  document.querySelector(".s"),
  document.querySelector(".d"),
  document.querySelector(".f"),
  document.querySelector(".g"),
  document.querySelector(".h"),
  document.querySelector(".j"),
  document.querySelector(".k"),
  document.querySelector(".l"),
  document.querySelector(".z"),
  document.querySelector(".x"),
  document.querySelector(".c"),
  document.querySelector(".v"),
  document.querySelector(".b"),
  document.querySelector(".n"),
  document.querySelector(".m"),
  document.querySelector(".enter"),
  document.querySelector(".del"),
];
const gameWord = ["a", "b", "o", "u", "t"];
const numLetters = 5;
const numLines = 6;
const line1 = document.querySelector(".line-1");
const pageContainer = document.querySelector(".page-container");
const currentWordArr = [];

// #region Functions
function getCurrentLine() {
  for (let i = 1; i <= numLines; i++) {
    if (
      !pageContainer.querySelector(`.line-${i}`).classList.contains("completed")
    ) {
      return pageContainer.querySelector(`.line-${i}`);
    }
  }
}

function getCurrentLetter() {
  const currentLine = getCurrentLine();

  for (let i = 1; i <= numLetters; i++) {
    if (currentLine.querySelector(`.letter-${i}`).textContent === "") {
      return currentLine.querySelector(`.letter-${i}`);
    } else if (i === 5) {
      return currentLine.querySelector(`.letter-${numLetters}`);
    }
  }
}

function getPreviousLetter() {
  const currentLine = getCurrentLine();

  for (let i = 1; i <= numLetters; i++) {
    if (currentLine.querySelector(`.letter-${i}`).textContent === "") {
      return currentLine.querySelector(`.letter-${i - 1}`);
    } else if (i === 5) {
      return currentLine.querySelector(`.letter-${numLetters}`);
    }
  }
}

function checkInput(key) {
  if (key === "Backspace" || key === "Delete") {
    deleteLetter();
    return 0;
  } else if (key >= "a" && key <= "z") {
    return 1;
  } else if (key === "Enter") {
    return 2;
  } else {
    return 0;
  }
}

function deleteLetter() {
  currentWordArr.pop();
  getPreviousLetter().textContent = "";
}

function validateWord() {
  if (currentWordArr.length === numLetters) {
    // Check if word is in the word list
    // isInWordList = false;

    // wordList.forEach((word, i) => {
    //   if (currentWordArr.join("") === word) {
    //     isInWordList = true;
    //   }
    // });

    // Check letters against game word
    currentWordArr.forEach((letter, i) => {
      const letterEl = getCurrentLine().querySelector(`.letter-${i + 1}`);

      // Change to green, guessed correctly
      if (letter === gameWord[i]) {
        letterEl.style.backgroundColor = green;
        letterEl.style.borderColor = green;

        // Change to yellow, guess in the word
      } else if (gameWord.includes(letter)) {
        letterEl.style.backgroundColor = yellow;
        letterEl.style.borderColor = yellow;

        // Change to gray, letter not in word
      } else {
        letterEl.style.backgroundColor = darkGray;
        letterEl.style.borderColor = darkGray;
      }
    });

    getCurrentLine().classList.add("completed");
    currentWordArr.length = 0;
  } else {
    console.log("Not enough letters!");
  }
}

// Event Handlers
window.addEventListener("keydown", (e) => {
  const input = checkInput(e.key);

  if (input === 1 && getCurrentLetter().textContent === "") {
    getCurrentLetter().textContent = e.key.toUpperCase();
    currentWordArr.push(e.key);
  }

  if (input === 2) {
    validateWord();
  }
});

keyboardArr.forEach((keyEl) =>
  keyEl.addEventListener("click", (e) => {
    const key = keyEl.textContent.toLowerCase();
    const input = checkInput(key);
    console.log(key);

    if (input === 1 && getCurrentLetter().textContent === "") {
      getCurrentLetter().textContent = key.toUpperCase();
      currentWordArr.push(key);
    }
  })
);
