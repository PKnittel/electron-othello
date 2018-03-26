
import { Stone } from "./stone";
import { Color } from "./constants";

class Field {
    field: Array<Array<Stone>>;

    constructor(size: number) {
        if(size >= 2 && size % 2 > 0) {
            throw('Unsupported field size. Please use a multiple of 2.')
        }
        let gameField = new Array(size);
        gameField.map(function() {
            return new Array(size);
        });
        this.field = gameField;

        const centerPosition = (size / 2) - 1;
        this.field[centerPosition][centerPosition] = new Stone(Color.white);
        this.field[centerPosition + 1][centerPosition] = new Stone(Color.black);
        this.field[centerPosition][centerPosition + 1] = new Stone(Color.black);
        this.field[centerPosition + 1][centerPosition + 1] = new Stone(Color.white);
    }
}