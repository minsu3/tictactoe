// global scope
let currentPlayer = 'X';
let dictionaryOne = {}; // 'X'
let dictionaryTwo = {}; // 'O'
let scores = {'X': 0, 'O': 0};


let firstRow = document.querySelector("#firstrow")
let secondRow = document.querySelector("#secondrow")
let thirdRow = document.querySelector("#thirdrow")

let refreshBtn = document.getElementById('refresh')
refreshBtn.addEventListener('click', gameReset);

function handleClick(event) {
    // only put 'X' or 'O' if grid is empty.
    if (event.currentTarget.innerText == '') {
        event.currentTarget.innerText = currentPlayer;
    }

    let item = event.currentTarget 
    let id = parseInt(item.id);

    console.log(id + " <=== this is id number of each boxes")

    if (currentPlayer == 'X') {
        // id: integer form of ID of the element clicked.
        dictionaryOne[id] = id;

        console.log('dictionaryOne: ', dictionaryOne)
        //it keeps track of marked players 
        
        if (winHorizontal(dictionaryOne) ||
            winVertical(dictionaryOne)   || 
            winDiagonal(dictionaryOne)) 

            {
            scoreBoard(currentPlayer)
            }

        currentPlayer = 'O';

    } else {

        dictionaryTwo[id] = id;

        console.log('dictionaryTwo: ', dictionaryTwo)

        if (winHorizontal(dictionaryTwo) || 
            winVertical(dictionaryTwo)   ||
            winDiagonal(dictionaryTwo))
        {
            scoreBoard(currentPlayer)
        }
        currentPlayer = 'X'
    }

    // add item's id to dictionary
    // dictionary of same key and value: {"1": 1, "2": 2, etc.}
    // dictionary[parseInt(id)] = parseInt("id");
}
//rowOne is an array
let rowOne = firstRow.querySelectorAll(".first") 
let rowTwo = secondRow.querySelectorAll(".second")
let rowThree = thirdRow.querySelectorAll(".third")

//each element in the row
rowOne.forEach(item => {
    item.addEventListener("click", handleClick)
});
rowTwo.forEach(item => {
    item.addEventListener("click", handleClick)
}); 
rowThree.forEach(item => {
    item.addEventListener("click", handleClick)
}); 

let horizontalArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

let verticalArray = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]

let diagonalArray = [
    [1, 5, 9],
    [3, 5, 7]
]

function winHorizontal(dictionary) {

    for (let i = 0; i < horizontalArray.length; i++) {
        let count = 0;
        for (let j = 0; j < horizontalArray[i].length; j++) {
            let gridId = horizontalArray[i][j];
            // gridId = 4 
            if (gridId in dictionary) {
                //if gridId in the clicked box
                //gridId is key dictionary is the object
                // console.log('count: ', count);
                count += 1;
            }
        }
        if (count == 3) {
            return true;
        }
    }
    return false;
}

function winVertical(dictionary) {
    for (let i = 0; i < verticalArray.length; i++) {
        let count = 0;
        for (let j = 0; j < verticalArray[i].length; j++) {

            let gridId = verticalArray[i][j];

            if (gridId in dictionary) {
                count += 1;
            }
        }
        if (count == 3) {
            return true;
        }
    }
    return false;
}

function winDiagonal(dictionary) {
    for (let i = 0; i < diagonalArray.length; i++) {
        let count = 0;

        for (let j = 0; j < diagonalArray[i].length; j++) {

            let gridId = diagonalArray[i][j];

            if (gridId in dictionary) {
                count += 1;
            }
        }
        if (count == 3) {
            return true;
        }
    }
    return false;
}

/**
 * currentPlayer has won the game!
 */
function scoreBoard(currentPlayer) {
    // add one point to currentPlayer's scoreboard.
    scores[currentPlayer] += 1;

    if(currentPlayer == 'X') {
        document.getElementById('boxone').innerHTML = scores[currentPlayer]
    } else {
        document.getElementById('boxtwo').innerHTML = scores[currentPlayer]
    }
    
    console.log(scores)
    console.log(scores[currentPlayer])

    alert('Player ' + currentPlayer + ' won the game!');

    // reset the game to start a new round.
    gameReset();
}

/**
 * Resets all the innerText back to empty string.
 */
function gameReset() {
    dictionaryOne = {};
    dictionaryTwo = {};
    currentPlayer = 'X';
    //clearing with empty strings 
    rowOne.forEach(item => {
        item.innerText = ''
    });
    rowTwo.forEach(item => {
        item.innerText = ''
    }); 
    rowThree.forEach(item => {
        item.innerText = ''
    }); 
}

