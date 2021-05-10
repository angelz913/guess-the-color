// max RGB value
const RGBMAX = 255

// modes
const easyMode = 1
const mediumMode = 2
const hardMode = 3

// number of squares
const easySquares = 3
const mediumSquares = 6
const hardSquares = 9

// global states
let currentColor = "#fff"
let currentMode = easyMode
let found = false

// elements
let header = document.getElementById("header")
let topString = document.getElementById("topString")
let rgbString = document.getElementById("rgbString")
let container = document.getElementsByClassName("container")[0]
let squares = document.getElementsByClassName("square")
let newColorsBtn = document.getElementById("newColorsBtn")
let difficultyBtns = document.getElementsByClassName("difficulty")
let easyBtn = document.getElementById("easyBtn")
let mediumBtn = document.getElementById("mediumBtn")
let hardBtn = document.getElementById("hardBtn")

// Generate random number
function randomNumber(upperBound) {
    return Math.floor(Math.random() * (upperBound + 1))
}

// Generate random RGB color
function randomColor() {
    let redValue = randomNumber(RGBMAX)
    let greenValue = randomNumber(RGBMAX)
    let blueValue = randomNumber(RGBMAX)
    return { red: redValue, green: greenValue, blue: blueValue }
}

// Get the number of squares in the current mode
function getNumberOfSquares() {
    if (currentMode === easyMode) {
        return easySquares
    } else if (currentMode === mediumMode) {
        return mediumSquares
    } else {
        return hardSquares
    }
}

// Change the color of every square after finding the correct one
function changeColorAll() {
    const length = getNumberOfSquares()
    for (let i = 0; i < length; i++) {
        squares[i].classList.add("correct")
        squares[i].style.backgroundColor = currentColor
    }
}

// Check if the square clicked is correct
function checkColor() {
    const length = getNumberOfSquares()
    for (let i = 0; i < length; i++) {
        squares[i].addEventListener("click", e => {
            if (e.target.style.backgroundColor === currentColor) {
                found = true
                topString.innerHTML = "Correct!"
                header.style.background = currentColor
                newColorsBtn.innerHTML = "Play Again"
                changeColorAll()
            } else if (!found) {
                topString.innerHTML = "Try again."
                squares[i].classList.add("incorrect")
                squares[i].style.opacity = "0%"
            } else {
                return
            }
        })
    }
}

// Generate colors for squares
function loadPage() {
    found = false
    topString.innerHTML = "Guess the color!"
    header.style.background = "#45c1d6"
    newColorsBtn.innerHTML = "New Colors"
    const newColor = randomColor()
    newColorString = "RGB(" + newColor.red + ", " + newColor.green + ", " + newColor.blue + ")"
    rgbString.innerHTML = newColorString

    let randomSquareIndex = 0
    if (currentMode === easyMode) {
        randomSquareIndex = randomNumber(easySquares - 1)
    } else if (currentMode === mediumMode) {
        randomSquareIndex = randomNumber(mediumSquares - 1)
    } else if (currentMode === hardMode) {
        randomSquareIndex = randomNumber(hardSquares - 1)
    }
    
    const length = getNumberOfSquares()
    for (let i = 0; i < length; i++) {
        squares[i].style.opacity = "100%"
        squares[i].classList.remove("correct")
        squares[i].classList.remove("incorrect")
        if (i === randomSquareIndex) {
            newColorString = "rgb(" + newColor.red + ", " + newColor.green + ", " + newColor.blue + ")"
            squares[i].style.backgroundColor = newColorString 
        } else {
            let newColor = randomColor()
            let newColorString = "rgb(" + newColor.red + ", " + newColor.green + ", " + newColor.blue + ")"
            squares[i].style.backgroundColor = newColorString   
        }
    }
    currentColor = newColorString
    checkColor()
}

// Switch mode
for (let i = 0; i < difficultyBtns.length; i++) {
    difficultyBtns[i].addEventListener("click", e => {
        if (e.target.id === "easyBtn") {
            if (currentMode === easyMode) {
                return
            }
            currentMode = easyMode
            container.classList.add("easy")
            container.classList.remove("medium")
            container.classList.remove("hard")
            easyBtn.classList.add("active")
            mediumBtn.classList.remove("active")
            hardBtn.classList.remove("active")
            for (let j = 0; j < squares.length; j++) {
                if (j < easySquares) {
                    squares[j].classList.remove("hidden")
                } else {
                    squares[j].classList.add("hidden")
                }
            }
        } else if (e.target.id === "mediumBtn") {
            if (currentMode === mediumMode) {
                return
            }
            currentMode = mediumMode
            container.classList.remove("easy")
            container.classList.add("medium")
            container.classList.remove("hard")
            easyBtn.classList.remove("active")
            mediumBtn.classList.add("active")
            hardBtn.classList.remove("active")
            for (let j = 0; j < squares.length; j++) {
                if (j < mediumSquares) {
                    squares[j].classList.remove("hidden")
                } else {
                    squares[j].classList.add("hidden")
                }
            }
        } else {
            if (currentMode === hardMode) {
                return
            }
            currentMode = hardMode
            container.classList.remove("easy")
            container.classList.remove("medium")
            container.classList.add("hard")
            easyBtn.classList.remove("active")
            mediumBtn.classList.remove("active")
            hardBtn.classList.add("active")
            for (let j = 0; j < squares.length; j++) {
                if (j < hardSquares) {
                    squares[j].classList.remove("hidden")
                } else {
                    squares[j].classList.add("hidden")
                }
            }
        }
        loadPage()
    })
}

window.addEventListener("load", loadPage)
newColorsBtn.addEventListener("click", loadPage)
