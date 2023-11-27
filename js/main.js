// buttons 
let turnButton = document.querySelector(".turn");
let replayButton = document.querySelector(".replay");
let xwinsButton = document.querySelector(".xwins");
let owinsButton = document.querySelector(".owins");
let drawsButton = document.querySelector(".draws");
let modeButton = document.querySelector(".mode-switch")

// squares
let squares = document.querySelectorAll(".square");
let turn = 'x';
let xSquares = [];
let oSquares = [];
let playing = true;
let xwins = 0;
let owins = 0;
let draws = 0;
let mode = "multiplayer";
let alertMessage = document.querySelector(".alert");

// functions

if(window.sessionStorage.draws !== undefined) {
  xwins = Number(window.sessionStorage.getItem("xWins"));
  xwinsButton.innerHTML = window.sessionStorage.getItem("xWins");
  owins = Number(window.sessionStorage.getItem("oWins"));
  owinsButton.innerHTML = window.sessionStorage.getItem("oWins");
  draws = Number(window.sessionStorage.getItem("draws"));
  drawsButton.innerHTML = window.sessionStorage.getItem("draws");
}

function handleSquareCLick (square) {
  if (mode == "engine") {
    if(square.innerHTML !== "" || turn !== "x" || !playing) return;
    const icon = document.createElement("i");
    icon.className = "fa fa-x x-icon";  
    turn="o";
    turnButton.innerHTML = "<i class='fa fa-o o-icon'></i>";
    xSquares.push(Number(square.dataset.number));
    square.appendChild(icon);
    square.classList.add("x");
    if(checkWinner() === false) {
      if(!isEnded()) {
        playComputer();
      } else {
        setDraws();
        playing = false;
        alertMessage.innerHTML = "draw";
        alertMessage.classList.add("on");
      }
    }
  } else if (mode == "multiplayer") {
    if(square.innerHTML !== "" || !playing) return;
    if(turn == "x") {
      const icon = document.createElement("i");
      icon.className = "fa fa-x x-icon";  
      turn="o";
      turnButton.innerHTML = "<i class='fa fa-o o-icon'></i>";
      xSquares.push(Number(square.dataset.number));
      square.appendChild(icon);
      square.classList.add("x");
      checkWinner();
      if(isEnded() && checkWinner() == false) {
        alertMessage.classList.add("on");
        alertMessage.innerHTML = "draw";
        setDraws();
        playing = false;
      }
    } else {
      if(turn == "o") {
        const icon = document.createElement("i");
        icon.className = "fa fa-o o-icon";  
        turn="x";
        turnButton.innerHTML = "<i class='fa fa-x x-icon'></i>";
        xSquares.push(Number(square.dataset.number));
        square.appendChild(icon);
        square.classList.add("o");
        checkWinner() 
      }
    }

  }
}


squares.forEach(square =>  square.addEventListener("click", () => handleSquareCLick(square)));


function playComputer () {
  setTimeout(() => {
    let o = checkOMove();
    if(squares[o].innerHTML !== "") return; 
    const icon = document.createElement("i");
    icon.className = "fa fa-o o-icon";  
    turn="x";
    turnButton.innerHTML = "<i class='fa fa-x x-icon'></i>";
    oSquares.push(Number(squares[o].dataset.number));
    squares[o].appendChild(icon);
    squares[o].classList.add("o");
    if(checkWinner() !== false) playing = false;
  }, 500);
}

function checkOMove () {
  for(let comb of squaresWinCombinations) {
    for(let square of oSquares) {
      if(square == comb[0]) {
        for(let square2 of oSquares) {
          if(square2 == comb[1]) {
            if( squares[comb[2] - 1].innerHTML === "" ) return comb[2] - 1;
          } else if(square2 == comb[2]) {
            if( squares[comb[1] - 1].innerHTML === "" ) return comb[1] - 1;
          }
        }
      }
      if(square == comb[1]) {
        for(let square2 of oSquares) {
          if(square2 == comb[0]) {
            if( squares[comb[2] - 1].innerHTML == "" ) return comb[2] - 1;
          } else if(square2 == comb[2]) {
            if( squares[comb[0] - 1].innerHTML == "" ) return comb[0] - 1;
          }
        }
      }
    }
  }
  for(let comb of squaresWinCombinations) {
    for(let square of xSquares) {
      if(square == comb[0]) {
        for(let square2 of xSquares) {
          if(square2 == comb[1]) {
            if( squares[comb[2] - 1].innerHTML === "" ) return comb[2] - 1;
          }else if(square2 == comb[2]) {
            if( squares[comb[1] - 1].innerHTML === "" ) return comb[1] - 1;
          }
        }
      }
      if(square == comb[1]) {
        for(let square2 of xSquares) {
          if(square2 == comb[0]) {
            if( squares[comb[2] - 1].innerHTML == "" ) return comb[2] - 1;
          }else if(square2 == comb[2]) {
            if( squares[comb[0] - 1].innerHTML == "" ) return comb[0] - 1;
          }
        }
      }
    }
  }


  if(squares[4].innerHTML == "") return 4;
  if(squares[1].innerHTML == "") return 1;
  if(squares[3].innerHTML == "") return 3;
  if(squares[5].innerHTML == "") return 5;
  if(squares[7].innerHTML == "") return 7;
  if(squares[0].innerHTML == "") return 0;
  if(squares[2].innerHTML == "") return 2;
  if(squares[6].innerHTML == "") return 6;
}

function isEnded () {
  for (let i of squares) {
    if(i.innerHTML === "") {
      return false;
      break;
    }
  }
  return true;
}

function checkWinner () {
  for(let comb of squaresWinCombinations) {
    if(squares[comb[0] - 1].classList.contains("x") && squares[comb[1] - 1 ].classList.contains("x") && squares[comb[2] - 1].classList.contains("x")) {
      squares[comb[0] - 1].classList.add("won");
      squares[comb[1] - 1].classList.add("won");
      squares[comb[2] - 1].classList.add("won");
      alertMessage.innerHTML = "x won";
      alertMessage.classList.add("on");
      setX();
      playing = false;
      return "x";
    } else if(squares[comb[0] - 1].classList.contains("o") && squares[comb[1] - 1 ].classList.contains("o") && squares[comb[2] - 1].classList.contains("o")) {
      squares[comb[0] - 1].classList.add("won");
      squares[comb[1] - 1].classList.add("won");
      squares[comb[2] - 1].classList.add("won");
      owinsButton.innerHTML = owins;
      alertMessage.innerHTML = "o won";
      alertMessage.classList.add("on");
      setO();
      playing = false;
      return "o";
    }
  }
  
  return false;
}

replayButton.onclick = () => {
  squares.forEach(square => {
    square.className = "square";
    square.innerHTML = "";
  });
  turn = "x";
  turnButton.innerHTML = "<i class='fa fa-x x-icon'></i>";
  playing = true;
  xSquares = [];
  oSquares = [];
  alertMessage.innerHTML = "";
  alertMessage.classList.remove("on");
}

modeButton.onclick = () => {
  if(mode == "multiplayer") {
    mode = "engine";
    modeButton.innerHTML = "<i class='fa fa-computer'></i>";
    replayButton.click();
    modeButton.className="mode-switch engine";
  } else if(mode == "engine") {
    mode = "multiplayer";
    modeButton.innerHTML = "<i class='fa fa-user'></i>";
    replayButton.click();
    modeButton.className="mode-switch multiplayer";
  }
  setX("reset");
  setO("reset");
  setDraws("reset")
}

let setO = (method) => {
  if(method === "reset") {
    owins = 0;
    owinsButton.innerHTML = owins;
    window.sessionStorage.setItem("oWins", owins);
  } else {
    owins+=1;
    owinsButton.innerHTML = owins;
    window.sessionStorage.setItem("oWins", owins);
  }
}
let setX = (method) => {
  if(method === "reset") {
    xwins = 0;
    xwinsButton.innerHTML = xwins;
    window.sessionStorage.setItem("xWins", xwins);
  } else {
    xwins+=1;
    xwinsButton.innerHTML = xwins;
    window.sessionStorage.setItem("xWins", xwins);
  }
}
let setDraws = (method) => {
  if(method === "reset") {
    draws = 0;
    drawsButton.innerHTML = draws;
    window.sessionStorage.setItem("draws", draws);
  } else {
    draws+=1;
    drawsButton.innerHTML = draws;
    window.sessionStorage.setItem("draws", draws);
  }
}

let squaresWinCombinations = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7],
];