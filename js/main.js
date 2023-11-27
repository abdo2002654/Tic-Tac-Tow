// buttons 
let resetButton = document.querySelector(".reset");
let turnButton = document.querySelector(".turn");
let playButton = document.querySelector(".play");

// squares
let squares = document.querySelectorAll(".square");
let turn = 'x';
squares.forEach(square => {
  square.onclick = () => {
    if(square.innerHTML === ""){const icon = document.createElement("i");
    if(turn === "x") {
      icon.className = "fa fa-x x-icon";
      turnButton.innerHTML = '<i class="fa fa-o o-icon"></i>'
      turn = "o";
    }
    square.appendChild(icon);
    playComputer();}
  }
})

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