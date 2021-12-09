// gameBoard module 
const gameBoard = (() => {
  let board = [
    ['X', ' ', ' '],
    ['O', 'O', 'O'],
    [' ', ' ', 'X']
  ];

  return { board };
})();

// player factory 
const Player = () => {

}

// display controller module 
const displayController = (() => {
  const render = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = document.querySelector(`#r${i}-c${j}`);
        square.textContent = gameBoard.board[i][j];
      }
    }
  };
  
  
  
  
  return { render };
})();

displayController.render();