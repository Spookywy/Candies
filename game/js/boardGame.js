class BoardGame {
    constructor(arrayBoard, width, height) {
        if(BoardGame.singleton) {
            return BoardGame.singleton;
        }
        this.arrayBoard = arrayBoard;
        this.firstSelectedCandy = null;
        this.secondSelectedCandy = null;
        this.width = width;
        this.height = height;
        BoardGame.singleton = this;
    }

    getArrayBoard() {
        return this.arrayBoard;
    }

    setFirstSelectedCandy(candy) {
        this.firstSelectedCandy = candy;
    }

    getFirstSelectedCandy() {
        return this.firstSelectedCandy;
    }

    setSecondSelectedCandy(candy) {
        this.secondSelectedCandy = candy;
    }

    getSecondSelectedCandy() {
        return this.secondSelectedCandy;
    }

    invertTwoCandies() {
        if (
            (this.firstSelectedCandy.posX == this.secondSelectedCandy.posX+1 && this.firstSelectedCandy.posY == this.secondSelectedCandy.posY) || 
            (this.firstSelectedCandy.posX == this.secondSelectedCandy.posX-1 && this.firstSelectedCandy.posY == this.secondSelectedCandy.posY) ||
            (this.firstSelectedCandy.posX == this.secondSelectedCandy.posX && this.firstSelectedCandy.posY == this.secondSelectedCandy.posY+1) ||
            (this.firstSelectedCandy.posX == this.secondSelectedCandy.posX && this.firstSelectedCandy.posY == this.secondSelectedCandy.posY-1)
        ) {
            this.invertTwoCandiesInTheArray(this.firstSelectedCandy, this.secondSelectedCandy);
        }
        renderTheBoardInHTML(this.arrayBoard)
        this.clearSelectedCandies();
    }

    invertTwoCandiesInTheArray(firstCandy, secondCandy) {
        this.arrayBoard[firstCandy.posY][firstCandy.posX] = secondCandy;
        let secondSelectedCandyposX = secondCandy.posX;
        let secondSelectedCandyposY = secondCandy.posY;
        secondCandy.changeCoordinate(firstCandy.posX, firstCandy.posY)
        this.arrayBoard[secondSelectedCandyposY][secondSelectedCandyposX] = firstCandy;
        firstCandy.changeCoordinate(secondSelectedCandyposX, secondSelectedCandyposY)
    }

    clearSelectedCandies() {
        this.firstSelectedCandy = null;
        this.secondSelectedCandy = null;
    }

    checkForSuccessiveCandyWithSameColor() {
        for(let i = 0; i<this.arrayBoard.length-1; i++) {
            for(let j = 0; j<this.arrayBoard.length-1; j++){
                let numberOfHorizontalNeighbourWithSameColor = this.getNumberOfHorizontalNeighbourCandiesWithSameColor(this.arrayBoard[i][j]);
                if(numberOfHorizontalNeighbourWithSameColor >= 2) {
                    this.removeHorizontalNeighbourCandies(this.arrayBoard[i][j], numberOfHorizontalNeighbourWithSameColor);
                }

                let numberOfVerticalNeighbourWithSameColor = this.getNumberOfVerticalNeighbourCandiesWithSameColor(this.arrayBoard[i][j]);
                if(numberOfVerticalNeighbourWithSameColor >= 2) {
                    this.removeVerticalNeighbourCandies(this.arrayBoard[i][j], numberOfVerticalNeighbourWithSameColor);
                }
            }
        }
    }

    getNumberOfHorizontalNeighbourCandiesWithSameColor(candy) {
        let numberOfNeighbourWithSameColor = 0;
        let stillLookingForNeighbour = true;
        let stepForSearch = 1;
        while(stillLookingForNeighbour) {
            if(candy.color == this.arrayBoard[candy.posY][candy.posX+stepForSearch].color){
                numberOfNeighbourWithSameColor++;
                stepForSearch++;
            } else {
                stillLookingForNeighbour = false;
            }
        }
        return numberOfNeighbourWithSameColor;
    }

    getNumberOfVerticalNeighbourCandiesWithSameColor(candy) {
        let numberOfNeighbourWithSameColor = 0;
        let stillLookingForNeighbour = true;
        let stepForSearch = 1;
        while(stillLookingForNeighbour) {
            if(candy.color == this.arrayBoard[candy.posY+stepForSearch][candy.posX].color){
                numberOfNeighbourWithSameColor++;
                stepForSearch++;
            } else {
                stillLookingForNeighbour = false;
            }
        }
        return numberOfNeighbourWithSameColor;
    }

    removeHorizontalNeighbourCandies(originalCandy, numberOfNeighbourToRemove) {
        for(let i = 0; i<numberOfNeighbourToRemove+1 ; i++) {
            this.arrayBoard[originalCandy.posY][originalCandy.posX+i] = new Candy('Green', originalCandy.posY, originalCandy.posX+i);
        }
        renderTheBoardInHTML(this.arrayBoard)
    }

    removeVerticalNeighbourCandies(originalCandy, numberOfNeighbourToRemove) {
        for(let i = 0; i<numberOfNeighbourToRemove+1 ; i++) {
            this.arrayBoard[originalCandy.posY+i][originalCandy.posX] = new Candy('Green', originalCandy.posY, originalCandy.posX+i);
        }
        renderTheBoardInHTML(this.arrayBoard)
    }
}