// play game 
const playGame = (() => {  
  // initialize first player and print first message 
  let currPlayer = firstPlayer;
  displayController.printMessage(currPlayer.name);

  // eventListener on each square 
  const board = document.querySelectorAll('.square');
  board.forEach((square) => {
    square.addEventListener('click', (e) => {
      const updated = gameBoard.update(e.target.id, currPlayer.symbol);
      if (updated) {
        displayController.render();
        if (checkWin()) {
          console.log('there is a winner');
          displayController.printWinMessage(currPlayer.name);
          return;
        } else if (checkTie()) {
          console.log('it\s a tie');
          displayController.printTieMessage();
          return;
        }
        (currPlayer === player1) ? currPlayer = player2 : currPlayer = player1;
        displayController.printMessage(currPlayer.name);
      }
    });
  });

  // check for win 
  const checkWin = () => {
    console.log('checking for win...');
    const currBoard = gameBoard.board;
    // check for horizontal win 
    for (let i = 0; i < 3; i++) {
      if (currBoard[i][0] !== ' ' && currBoard[i][0] === currBoard[i][1] && currBoard[i][1] === currBoard[i][2]) {
        return true;
      }
    }
    // check for vertical win 
    for (let j = 0; j < 3; j++) {
      if (currBoard[0][j] !== ' ' && currBoard[0][j] === currBoard[1][j] && currBoard[1][j] === currBoard[2][j]) {
        return true;
      }
    }
    // check for diagonal win 
    if (
      (currBoard[0][0] !== ' ' && currBoard[0][0] === currBoard[1][1] && currBoard[1][1] === currBoard[2][2])
      || (currBoard[0][2] !== ' ' && currBoard[0][2] === currBoard[1][1] && currBoard[1][1] === currBoard[2][0])
    ) {
      return true;
    }
  };

  // check for a tie 
  const checkTie = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[i][j] === ' ') {
          return false;
        }
      }
    }
    return true;
  };
});

// gameBoard module 
const gameBoard = (() => {
  // game board as array 
  let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  // function to update board 
  const update = (squareId, turn) => {
    const row = squareId.split('-')[0][1];
    const col = squareId.split('-')[1][1];
    if (board[row][col] === ' ') {
      board[row][col] = turn;
      return true;
    } else {
      console.log('this square if disabled');
      return false;
    }
  };

  return { 
    board,
    update,
  };
})();

// player factory 
const player = (name, symbol) => {
  return { name, symbol };
}

// display controller module 
const displayController = (() => {
  // render the whole board
  const render = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = document.querySelector(`#r${i}-c${j}`);
        square.textContent = gameBoard.board[i][j];
      }
    }
  };

  // render message 
  const printMessage = (playerName) => {
    const message = document.querySelector('.message > h3');
    message.textContent = `${playerName}'s turn`;
  };

  // render win message 
  const printWinMessage = (playerName) => {
    const message = document.querySelector('.message > h3');
    message.textContent = `${playerName} won!`;
  };
  
  // render tie message 
  const printTieMessage = () => {
    const message = document.querySelector('.message > h3');
    message.textContent = `It was a tie!`;
  }
  
  return { 
    render,
    printMessage,
    printWinMessage,
    printTieMessage,
  };
})();

// play
const player1 = player('Player 1', 'O');
const player2 = player('Player 2', 'X');
let firstPlayer = player1;
playGame();