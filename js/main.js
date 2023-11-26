let squares = document.querySelectorAll(".game .body .square");
let turnButton = document.querySelector("button.turn");
let restart = document.querySelector(".restart");
let xWins = document.querySelector(".x-wins");
let oWins = document.querySelector(".o-wins");
let draws = document.querySelector(".draws");
let turn = "x";
let game = "on";

if(window.sessionStorage.oWins !== undefined) oWins.innerHTML = window.sessionStorage.oWins;
if(window.sessionStorage.xWins !== undefined) xWins.innerHTML = window.sessionStorage.xWins;
if(window.sessionStorage.draws !== undefined) draws.innerHTML = window.sessionStorage.draws;

squares.forEach(square => {
  square.onclick = () => {
    if(game === "on") {

      if(square.innerHTML === '') {
        if(turn === "y") {
        square.innerHTML = "<i class='fa fa-o text-info fs-1'></i>";
        turnButton.innerHTML = "<i class='fa fa-xmark icon'></i> TURN";
        square.classList.add("o")
        turn = "x";
      } else {
        turnButton.innerHTML = "<i class='fa fa-o icon'></i> TURN";
        square.innerHTML = "<i class='fa fa-xmark text-warning fs-1'></i>";
        square.classList.add("x")
        turn = "y";
      }
    }
    checkWin();
  }
  }
})

let checkWin = () => {
  if(squares[0].classList.contains("x") &&squares[1].classList.contains("x") &&squares[2].classList.contains("x")) {winner("x", [0, 1, 2])}
  else if(squares[0].classList.contains("x") &&squares[3].classList.contains("x") &&squares[6].classList.contains("x")) {winner("x", [0, 3, 6])}
  else if(squares[0].classList.contains("x") &&squares[4].classList.contains("x") &&squares[8].classList.contains("x")) {winner("x", [0, 4, 8])}
  else if(squares[2].classList.contains("x") &&squares[5].classList.contains("x") &&squares[8].classList.contains("x")) {winner("x", [2, 5, 8])}
  else if(squares[6].classList.contains("x") &&squares[7].classList.contains("x") &&squares[8].classList.contains("x")) {winner("x", [6, 7, 8])}
  else if(squares[2].classList.contains("x") &&squares[4].classList.contains("x") &&squares[6].classList.contains("x")) {winner("x", [2, 4, 6])}
  else if(squares[3].classList.contains("x") &&squares[4].classList.contains("x") &&squares[5].classList.contains("x")) {winner("x", [3, 4, 5])}
  else if(squares[1].classList.contains("x") &&squares[4].classList.contains("x") &&squares[7].classList.contains("x")) {winner("x", [1, 4, 7])}
  else if(squares[0].classList.contains("o") &&squares[1].classList.contains("o") &&squares[2].classList.contains("o")) {winner("o", [0, 1, 2])}
  else if(squares[0].classList.contains("o") &&squares[3].classList.contains("o") &&squares[6].classList.contains("o")) {winner("o", [0, 3, 6])}
  else if(squares[0].classList.contains("o") &&squares[4].classList.contains("o") &&squares[8].classList.contains("o")) {winner("o", [0, 4, 8])}
  else if(squares[2].classList.contains("o") &&squares[5].classList.contains("o") &&squares[8].classList.contains("o")) {winner("o", [2, 5, 8])}
  else if(squares[6].classList.contains("o") &&squares[7].classList.contains("o") &&squares[8].classList.contains("o")) {winner("o", [6, 7, 8])}
  else if(squares[2].classList.contains("o") &&squares[4].classList.contains("o") &&squares[6].classList.contains("o")) {winner("o", [2, 4, 6])}
  else if(squares[3].classList.contains("o") &&squares[4].classList.contains("o") &&squares[5].classList.contains("o")) {winner("o", [3, 4, 5])}
  else if(squares[1].classList.contains("o") &&squares[4].classList.contains("o") &&squares[7].classList.contains("o")) {winner("o", [1, 4, 7])}
  else {
    let draw = true;
    squares.forEach(square => {
      if(square.innerHTML === "") {
        draw = false;
      }
    })
    draw ? winner("none"):"";
  }
}

let winner = (winner, array) => {
  if(winner === "x") {
    xWins.innerHTML = Number(xWins.innerHTML) + 1;
    window.sessionStorage.setItem("xWins", xWins.innerHTML);
    squares[array[0]].classList.add("winner");
    squares[array[1]].classList.add("winner");
    squares[array[2]].classList.add("winner");
  }
  if(winner === "o") {
    oWins.innerHTML = Number(oWins.innerHTML) + 1;
    window.sessionStorage.setItem("oWins", oWins.innerHTML);
    squares[array[0]].classList.add("winner");
    squares[array[1]].classList.add("winner");
    squares[array[2]].classList.add("winner");
  }
  if(winner == "none") {
    draws.innerHTML = Number(draws.innerHTML) + 1;
    window.sessionStorage.setItem("draws", draws.innerHTML);
  }
  game = 'off';
}
restart.onclick = () => {
  squares.forEach(square => {
    square.innerHTML = "";
    square.classList.remove("o");
    square.classList.remove("x");
    square.classList.remove("winner");
    game = "on";
    turn = "x";
    turnButton.innerHTML = "<i class='fa fa-xmark icon'></i> TURN";
  })
}