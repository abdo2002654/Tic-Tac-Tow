// buttons 
let resetButton = document.querySelector(".reset");
let turnButton = document.querySelector(".turn");
let playButton = document.querySelector(".play");

// squares
let squares = document.querySelectorAll(".square");
let turn = 'x';

// functions
function handleSquareCLick (square) {
  if(square.innerHTML !== "" || turn !== "x") return;
  const icon = document.createElement("i");
  icon.className = "fa fa-x x-icon";
  turnButton.innerHTML = '<i class="fa fa-o o-icon"></i>'
  turn = "o";
  square.appendChild(icon);
  playComputer();
}

squares.forEach(square =>  square.addEventListener("click", () => handleSquareCLick(square)));


function playComputer () { // computer turn
  setTimeout(() => {
    for (let i = 0; i < squares.length; i++) {
      const icon = document.createElement("i");
      icon.className = "fa fa-o o-icon";
      turnButton.innerHTML = '<i class="fa fa-x x-icon"></i>';
      turn = "x";
      if ( squares[i].innerHTML === "" ) {
        squares[i].appendChild(icon);
        break;
      }      
    }
  }, 500);
}

let squaresWinCombinations = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7],
];

for (let i of squaresWinCombinations) {
  
}