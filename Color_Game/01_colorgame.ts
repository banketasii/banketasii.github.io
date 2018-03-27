/* Section 15 Lecture 163 - 171 
   Color Game */

// ***** Variables *****
let gameSquares: NodeListOf<HTMLElement> = document.querySelectorAll(".gameSquare");
let colorDisplay: HTMLElement = document.querySelector("#rgb-color");
let messageDisplay: HTMLElement = document.querySelector("#message");
let h1Header: HTMLElement = document.querySelector("#header");
let h1HeaderColor: string = getComputedStyle(h1Header).backgroundColor;


let gameButtons:  NodeListOf<HTMLButtonElement> = document.querySelectorAll(".gameButton");

let bodyEl: HTMLElement = document.querySelector("body");
let initBackgroundColor: string = getComputedStyle(bodyEl).backgroundColor;

let numColors: number = ChangeNumber(gameButtons[2]);
let colors: string[] = generateRandomColors(numColors);
let pickedColor: string = pickRandomColor();
//**********************

//***** Function Definitions *****
function ChangeColors(color){ //Gets a new batch of colors to guess
  for(let i: number = 0; i < gameSquares.length; i++){
    gameSquares[i].style.backgroundColor = color;
  }
}

function pickRandomColor(): string{ //Picks a random color from the array
  let ind: number = Math.floor(Math.random() * numColors);
  return colors[ind];
}

function generateRandomColors(num: number): string[]{//Genereates random colors
  let arr: string[] = [];
  
  for(let i: number = 0; i < num; i++){
    arr[i] = RandomColor();
  }
  
  return arr;
}

function RandomColor(): string{ //Builds the rgb string for the random color
  let r: number = Math.floor(Math.random() * 256);
  let g: number = Math.floor(Math.random() * 256);
  let b: number = Math.floor(Math.random() * 256);
  
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function ResetGame(): void{ //Resets the game 
  colors = generateRandomColors(numColors);
  pickedColor = pickRandomColor();
  LoadColors();
  colorDisplay.textContent = pickedColor;
  h1Header.style.backgroundColor = h1HeaderColor;
  ChangeButtonText(gameButtons[0], "Change Colors?")
  messageDisplay.textContent = "Guess!!!";
}

function LoadColors(): void{
  for(let i: number = 0; i < gameSquares.length; i++){
    if(colors[i]){
      gameSquares[i].style.backgroundColor = colors[i];    
      gameSquares[i].style.display = "block";
    }else{
      gameSquares[i].style.display = "none";
    }
  }
}

function ChangeButtonText(btn: HTMLButtonElement, prompt: string): void{
  btn.textContent = prompt;
}

function ChangeNumber(btn: HTMLButtonElement): number{
  let radix: number = 10;
  return parseInt(btn.value, radix);
}

function ButtonPressed(btnPressed: HTMLButtonElement, btnNotPressed: HTMLButtonElement): void{
  numColors = ChangeNumber(btnPressed);
  HighlightPressedButton(btnPressed, btnNotPressed);
  ResetGame(); 
}

function HighlightPressedButton(btnPressed: HTMLButtonElement, btnNotPressed: HTMLButtonElement): void{
  btnPressed.classList.add("selected");
  btnNotPressed.classList.remove("selected");
}

//*****************************

//*****  Code to run after page loads *****
ResetGame();

for(let i: number = 0; i < gameSquares.length; i++){  
  gameSquares[i].addEventListener("click", () => {
    let clickedColor: string = gameSquares[i].style.backgroundColor;
    
    if(clickedColor === pickedColor){
      messageDisplay.textContent = "Correct!";
      h1Header.style.backgroundColor = pickedColor;
      ChangeColors(clickedColor);
      ChangeButtonText(gameButtons[0], "Play Again?")
    } else {
      messageDisplay.textContent = "Try Again!";
      gameSquares[i].style.backgroundColor = initBackgroundColor;
    }
  });
}

gameButtons[0].addEventListener("click", () => {
  ResetGame();  
});

gameButtons[1].addEventListener("click", () => {
  ButtonPressed(gameButtons[1], gameButtons[2]);
});

gameButtons[2].addEventListener("click", () => {
  ButtonPressed(gameButtons[2], gameButtons[1]);
});


//******************************************