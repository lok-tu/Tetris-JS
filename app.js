document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let gridSquares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#startButton");
  const gridWidth = 10;

  // Tetrominoes
  const jTetromino = [
    [1, gridWidth + 1, gridWidth * 2 + 1, 2],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
    [0, gridWidth, gridWidth + 1, gridWidth + 2],
  ];

  const lTetromino = [
    [0, 1, gridWidth + 1, gridWidth * 2 + 1],
    [2, gridWidth + 2, gridWidth + 1, gridWidth],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2 + 2],
    [gridWidth * 2, gridWidth, gridWidth + 1, gridWidth + 2],
  ];

  const sTetromino = [
    [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1],
    [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
    [gridWidth + 1, gridWidth + 2, gridWidth * 2, gridWidth * 2 + 1],
    [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
  ];

  const zTetromino = [
    [gridWidth, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2 + 2],
    [2, gridWidth + 2, gridWidth + 1, gridWidth * 2 + 1],
    [gridWidth, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2 + 2],
    [2, gridWidth + 2, gridWidth + 1, gridWidth * 2 + 1],
  ];

  const tTetromino = [
    [1, gridWidth, gridWidth + 1, gridWidth + 2],
    [1, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
    [1, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
    [0, 1, gridWidth, gridWidth + 1],
  ];

  const iTetromino = [
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
    [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
  ];

  const theTetrominoes = [
    jTetromino,
    lTetromino,
    sTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  // Randomly select a tetromino
  const random = Math.floor(Math.random() * theTetrominoes.length);
  let currentTetromino = theTetrominoes[random][currentRotation];

  // Draw the tetromino
  function draw() {
    currentTetromino.forEach((square) => {
      gridSquares[currentPosition + square].classList.add("tetromino");
    });
  }

  // Undraw the tetromino
  function undraw() {
    currentTetromino.forEach((square) => {
      gridSquares[currentPosition + square].classList.remove("tetromino");
    });
  }
});
