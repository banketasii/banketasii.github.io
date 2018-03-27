/* Section 15 Lecture 163 - 171
   Color Game */
// ***** Variables *****
var gameSquares = document.querySelectorAll(".gameSquare");
var colorDisplay = document.querySelector("#rgb-color");
var messageDisplay = document.querySelector("#message");
var h1Header = document.querySelector("#header");
var h1HeaderColor = getComputedStyle(h1Header).backgroundColor;
var gameButtons = document.querySelectorAll(".gameButton");
var bodyEl = document.querySelector("body");
var initBackgroundColor = getComputedStyle(bodyEl).backgroundColor;
var numColors = ChangeNumber(gameButtons[2]);
var colors = generateRandomColors(numColors);
var pickedColor = pickRandomColor();
//**********************
//***** Function Definitions *****
function ChangeColors(color) {
    for (var i = 0; i < gameSquares.length; i++) {
        gameSquares[i].style.backgroundColor = color;
    }
}
function pickRandomColor() {
    var ind = Math.floor(Math.random() * numColors);
    return colors[ind];
}
function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr[i] = RandomColor();
    }
    return arr;
}
function RandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function ResetGame() {
    colors = generateRandomColors(numColors);
    pickedColor = pickRandomColor();
    LoadColors();
    colorDisplay.textContent = pickedColor;
    h1Header.style.backgroundColor = h1HeaderColor;
    ChangeButtonText(gameButtons[0], "Change Colors?");
    messageDisplay.textContent = "Guess!!!";
}
function LoadColors() {
    for (var i = 0; i < gameSquares.length; i++) {
        if (colors[i]) {
            gameSquares[i].style.backgroundColor = colors[i];
            gameSquares[i].style.display = "block";
        }
        else {
            gameSquares[i].style.display = "none";
        }
    }
}
function ChangeButtonText(btn, prompt) {
    btn.textContent = prompt;
}
function ChangeNumber(btn) {
    var radix = 10;
    return parseInt(btn.value, radix);
}
function ButtonPressed(btnPressed, btnNotPressed) {
    numColors = ChangeNumber(btnPressed);
    HighlightPressedButton(btnPressed, btnNotPressed);
    ResetGame();
}
function HighlightPressedButton(btnPressed, btnNotPressed) {
    btnPressed.classList.add("selected");
    btnNotPressed.classList.remove("selected");
}
//*****************************
//*****  Code to run after page loads *****
ResetGame();
var _loop_1 = function (i) {
    gameSquares[i].addEventListener("click", function () {
        var clickedColor = gameSquares[i].style.backgroundColor;
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            h1Header.style.backgroundColor = pickedColor;
            ChangeColors(clickedColor);
            ChangeButtonText(gameButtons[0], "Play Again?");
        }
        else {
            messageDisplay.textContent = "Try Again!";
            gameSquares[i].style.backgroundColor = initBackgroundColor;
        }
    });
};
for (var i = 0; i < gameSquares.length; i++) {
    _loop_1(i);
}
gameButtons[0].addEventListener("click", function () {
    ResetGame();
});
gameButtons[1].addEventListener("click", function () {
    ButtonPressed(gameButtons[1], gameButtons[2]);
});
gameButtons[2].addEventListener("click", function () {
    ButtonPressed(gameButtons[2], gameButtons[1]);
});
//******************************************
