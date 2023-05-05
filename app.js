document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let gridSquares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#startButton");
  const gridWidth = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  const colors = [
    "blue",
    "orange",
    "green",
    "red",
    "purple",
    "yellow",
    "lightskyblue",
  ];

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

  let tetrominoesLeft = [0, 1, 2, 3, 4, 5, 6];

  function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  function resetTetrominoes() {
    tetrominoesLeft = [0, 1, 2, 3, 4, 5, 6];
  }

  let currentPosition = 4;
  let currentRotation = 0;

  // Randomly select a tetromino
  let random = Math.floor(Math.random() * tetrominoesLeft.length);
  let selectedTetromino = tetrominoesLeft[random];
  let currentTetromino = theTetrominoes[selectedTetromino][currentRotation];
  removeItem(tetrominoesLeft, selectedTetromino);

  // Draw the tetromino
  function draw() {
    currentTetromino.forEach((index) => {
      gridSquares[currentPosition + index].classList.add("tetromino");
      gridSquares[currentPosition + index].style.backgroundColor =
        colors[selectedTetromino];
    });
  }

  // Undraw the tetromino
  function undraw() {
    currentTetromino.forEach((index) => {
      gridSquares[currentPosition + index].classList.remove("tetromino");
      gridSquares[currentPosition + index].style.backgroundColor = "";
    });
  }

  // Assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keydown", control);

  // Move down function
  function moveDown() {
    if (
      !currentTetromino.some((index) =>
        gridSquares[currentPosition + index + gridWidth].classList.contains(
          "taken"
        )
      )
    ) {
      undraw();
      currentPosition += gridWidth;
      draw();
    } else {
      freeze();
    }
  }

  // Freeze function
  function freeze() {
    currentTetromino.forEach((index) =>
      gridSquares[currentPosition + index].classList.add("taken")
    );
    //start a new tetromino falling
    random = nextRandom;
    selectedTetromino = tetrominoesLeft[random];
    currentTetromino = theTetrominoes[selectedTetromino][currentRotation];
    removeItem(tetrominoesLeft, selectedTetromino);
    nextRandom = Math.floor(Math.random() * tetrominoesLeft.length);

    if (tetrominoesLeft.length === 0) {
      resetTetrominoes();
    }

    currentPosition = 4;
    addScore();
    draw();
    displayShape();
    gameOver();
  }

  // Move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = currentTetromino.some(
      (index) => (currentPosition + index) % gridWidth === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    if (
      currentTetromino.some((index) =>
        gridSquares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  // Move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const isAtRightEdge = currentTetromino.some(
      (index) => (currentPosition + index) % gridWidth === gridWidth - 1
    );
    if (!isAtRightEdge) currentPosition += 1;
    if (
      currentTetromino.some((index) =>
        gridSquares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  function isAtRight() {
    return currentTetromino.some(
      (index) => (currentPosition + index + 1) % gridWidth === 0
    );
  }

  function isAtLeft() {
    return currentTetromino.some(
      (index) => (currentPosition + index) % gridWidth === 0
    );
  }

  function checkRotatedPosition(P) {
    P = P || currentPosition;
    if ((P + 1) % gridWidth < 4) {
      if (isAtRight()) {
        currentPosition += 1;
        checkRotatedPosition(P);
      }
    } else if (P % gridWidth > 5) {
      if (isAtLeft()) {
        currentPosition -= 1;
        checkRotatedPosition(P);
      }
    }
  }

  // Rotate the tetromino
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === currentTetromino.length) {
      //if the current rotation gets to 4, make it go back to 0
      currentRotation = 0;
    }
    currentTetromino = theTetrominoes[selectedTetromino][currentRotation];
    checkRotatedPosition();
    draw();
  }
  /////////

  // Show up-next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  const displayIndex = 0;

  // The tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, 1, displayWidth + 1, displayWidth * 2 + 1],
    [
      displayWidth + 1,
      displayWidth + 2,
      displayWidth * 2,
      displayWidth * 2 + 1,
    ],
    [
      displayWidth,
      displayWidth + 1,
      displayWidth * 2 + 1,
      displayWidth * 2 + 2,
    ],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  // Display the shape in the mini-grid display
  function displayShape() {
    // Remove any trace of a tetromino form the entire grid
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTetrominoes[tetrominoesLeft[nextRandom]].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[tetrominoesLeft[nextRandom]];
    });
  }

  // Add functionality to the button
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * tetrominoesLeft.length);
      displayShape();
    }
  });

  // Add score
  function addScore() {
    for (let i = 0; i < 199; i += gridWidth) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (
        row.every((index) => gridSquares[index].classList.contains("taken"))
      ) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          gridSquares[index].classList.remove("taken");
          gridSquares[index].classList.remove("tetromino");
          gridSquares[index].style.backgroundColor = "";
        });
        const squaresRemoved = gridSquares.splice(i, gridWidth);
        gridSquares = squaresRemoved.concat(gridSquares);
        gridSquares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  // Game over
  function gameOver() {
    if (
      currentTetromino.some((index) =>
        gridSquares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = "Game Over";
      clearInterval(timerId);
      document.removeEventListener("keydown", control);
    }
  }
});
