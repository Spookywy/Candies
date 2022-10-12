function createBoard(width, height) {
    let board = new Array();
    for(let i = 0 ; i <= height ; i++) {
        board.push(new Array);
        for(let j = 0 ; j <= width ; j++) {
            board[i][j] = new Candy(Candy.getRandomColor(), i, j);
        }
    }
    return board;
}

function renderTheBoardInHTML(board) {
    let boardTable = document.getElementById("boardTable");
    boardTable.innerHTML = '';
    for(let i = 0 ; i <= board.length-1 ; i++) {
        let line = document.createElement("tr");
        boardTable.appendChild(line);
        for(let j = 0 ; j <= board[0].length-1 ; j++) {
            let box = document.createElement("td");
            box.onclick = onCandyClick(board[i][j], box);
            box.appendChild(getRenderedCandy(board[i][j]));
            line.appendChild(box);
        }
    }
}

function getRenderedCandy(candy) {
    let candyImage = document.createElement("img");
    candyImage.setAttribute('src', '../../images/'+getCandyImage(candy));
    candyImage.setAttribute('height', '50px');
    candyImage.setAttribute('width', '50px');
    candyImage.setAttribute('class', 'candyImage');
    return candyImage;
}

function getCandyImage(candy) {
    switch(candy.getColor()){
        case "Red":
            return "candy_red.png";
        case "Blue":
            return "candy_blue.png";
        case "Green":
            return "candy_green.png";
        case "Orange":
            return "candy_orange.png";
        case "Purple":
            return "candy_purple.png";
        case "Yellow":
            return "candy_yellow.png";
    }
}

function onCandyClick(candy, td) {
    return function() {
        td.childNodes[0].setAttribute('id', 'selectedCandyImage');
        boardGame = new BoardGame(null);
        if(!boardGame.getFirstSelectedCandy()){
            boardGame.setFirstSelectedCandy(candy);
        } else {
            boardGame.setSecondSelectedCandy(candy);
            boardGame.invertTwoCandies();
            boardGame.checkForSuccessiveCandyWithSameColor();
        }
    }
}