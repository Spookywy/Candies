class Candy {
    constructor(color, posY, posX) {
        this.color = color;
        this.posX = posX;
        this.posY = posY;
    }

    getColor() {
        return this.color;
    }

    changeCoordinate(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    static getRandomColor() {
        return this.getColors()[Math.floor(Math.random() * 6)];
    }

    static getColors() {
        return ['Red', 'Green', 'Yellow', 'Purple', 'Blue', 'Orange'];
    }
}