function main() {
    let width = 10;
    let height = 8;
    let boardGame = new BoardGame(createBoard(width, height), width, height);
    renderTheBoardInHTML(boardGame.getArrayBoard());
}