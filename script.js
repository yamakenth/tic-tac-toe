// gameBoard module 
// take in no parameters 
// return advanceTurn function which return game status 
// { win: 2, tie: 1, continue: 0 }
const gameBoard = (() => {
  // store board as 2d array 
  let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ]; 
  // function to advance one turn and return game status 
  function advanceTurn(squareId, playerMark) {
    const row = squareId.split('-')[0][1];
    const col = squareId.split('-')[1][1];
    if (board[row][col] === ' ') {
      board[row][col] = playerMark;
      renderBoard();
      console.log('The game Board was successfully updated and displayed.');
      const gameStatus = generateGameStatus();
      console.log({ gameStatus });
      return gameStatus;
    } else {
      console.log('This square is disabled.');
    }
  };
  // function to render game board on page
  function renderBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = document.querySelector(`#r${i}-c${j}`);
        square.textContent = board[i][j]; 
      }
    }
  };
  // function to generate game status { win: 2, tie: 1, continue: 0 }
  function generateGameStatus() {
    if (isWin()) {
      return 2;
    } else if (isTie()) {
      return 1;
    } else {
      return 0;
    }
  };
  // function to find if there is a winner 
  function isWin() {
    // check for horizontal win
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== ' ' && board[i].every(val => val === board[i][0])) {
        return true;
      }
    }
    // check for vertical win 
    for (let j = 0; j < 3; j++) {
      if (board[0][j] !== ' ' && (board[0][j] === board[1][j] && board[1][j] === board[2][j])) {
        return true;
      }
    }
    // check for diagonal win 
    if (
      (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2])
      || (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ) {
      return true;
    }
  };
  // function to find if there is a tie
  function isTie() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === ' ') {
          return false;
        }
      }
    }
    return true;
  };

  return {
    advanceTurn,
  }
})();


// player factory 
// take in player name and mark = 'X' || 'O'
// return object of a player 
const player = (name, mark) => {
  return { name, mark };
} 


// play the whole game 
// take in no parameters 
// return no results 
const playGame = (() => {
  // create players 
  const player1 = player('Player 1', 'O');
  const player2 = player('Player 2', 'X');
  // initialize first player and display message 
  let currPlayer = player1;
  renderMessage(0);
  // addEventListner to play one round after each click in a square
  const board = document.querySelectorAll('.square');
  board.forEach((square) => {
    square.addEventListener('click', playOneTurn);
  });
  // function to play one turn after a click
  function playOneTurn() {
    console.log(`clicked square ${this.id}.`);
    const gameStatus = gameBoard.advanceTurn(this.id, currPlayer.mark);
    if (gameStatus === 0) { // continue
      currPlayer = (currPlayer === player1) ? player2 : player1;
    } else if (gameStatus === 1 || gameStatus === 2) { // tie or win 
      board.forEach((square) => {
        square.removeEventListener('click', playOneTurn);
      });
    }
    renderMessage(gameStatus);
  }
  // function to diplay message
  function renderMessage(gameStatus) {
    const messageDisplay = document.querySelector('.message > h3');
    if (gameStatus === 0) {
      messageDisplay.textContent = `${currPlayer.name}'s turn`;
    } else if (gameStatus == 1) {
      messageDisplay.textContent = `It's a tie!`;
    } else if (gameStatus === 2) {
      messageDisplay.textContent = `${currPlayer.name} won!`;
    }
  } 
})();


// refresh page 
// take in no parameters 
// return no results 
const refreshPage = (() => {
  const restart = document.querySelector('.restart button');
  restart.addEventListener('click', () => window.location.reload());
})();

// scale up square when hover 
// take in no parameters 
// return no results 
const scaleOnHover = (() => {
  const board = document.querySelectorAll('.square');
  board.forEach((square) => {
    square.addEventListener('mouseenter', (e) => e.target.classList.add('square-active'));
    square.addEventListener('mouseleave', (e) => e.target.classList.remove('square-active'));

  });
})();