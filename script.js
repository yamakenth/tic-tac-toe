// play game 
const playGame = (() => {  
  // initialize first player and print first message 
  let currPlayer = firstPlayer;
  displayController.printMessage(currPlayer.name);
  // eventListener on each square 
  const board = document.querySelectorAll('.square');
  board.forEach((square) => {
    square.addEventListener('click', (e) => {
      gameBoard.update(e.target.id, currPlayer.symbol);
      displayController.render();
      (currPlayer === player1) ? currPlayer = player2 : currPlayer = player1;
      displayController.printMessage(currPlayer.name);
    });
  });

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
  const update= (squareId, turn) => {
    const row = squareId.split('-')[0][1];
    const col = squareId.split('-')[1][1];
    board[row][col] = turn;
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
  }
  
  return { 
    render,
    printMessage,
  };
})();

// play
const player1 = player('Ken', 'O');
const player2 = player('Gem', 'X');
let firstPlayer = player1;
playGame();