
import { Stone } from "./stone";
import { Color, Position } from "./constants";

class Field {
    field: (Stone | null)[][];
    remainingTurns: number;
    size: number;

    constructor(size: number) {
        if(size >= 2 && size % 2 > 0) {
            throw('Unsupported field size. Please use a multiple of 2.')
        }
        this.size = size;
        this.remainingTurns = size * size - 4;
        let gameField = new Array(size);
        for(let i=0; i<size; i++) {
            gameField[i] = new Array(size);
            gameField[i].fill(null);
        }
        this.field = gameField;

        const centerPosition = (size / 2) - 1;
        this.setCell(centerPosition, centerPosition, new Stone(Color.white));
        this.setCell(centerPosition + 1, centerPosition,  new Stone(Color.black));
        this.setCell(centerPosition, centerPosition + 1,  new Stone(Color.black));
        this.setCell(centerPosition + 1, centerPosition + 1,  new Stone(Color.white));
    }

    private getCell(x: number, y: number) {
        return this.field[y][x];
    }

    private setCell(x: number, y: number, stone: Stone) {
        this.field[y][x] = stone;
    }

    showField() {
        this.field.forEach(function(d, i) {
            let line = '';
            d.forEach(function(e, j){
                line += e ? e.getPlayer() + ' ' : ', ';
            })
            console.log(line);
        })
    }

    getField() {
        return this.field;
    }

    private checkDirection(initialPosition: Position, step: Position, stone: Stone) {
        let result = [];
        let position = initialPosition;
        while(true) {
            position = {
                x: position.x + step.x,
                y: position.y + step.y,
            }
            let cell = this.getCell(position.x, position.y);
            if(!cell){
                break;
            } else if(cell.getPlayer() === stone.getPlayer()){
                return result;
            } else {
                result.push(position);
            }
        }
    }

    private checkField(initialPosition: Position, stone: Stone) {   
        const directions = [{x:1, y:0}, {x:1, y:1},  {x:0, y:1},  {x:-1, y:1}, {x:-1, y:0}, {x:-1, y:-1},  {x:0, y:-1},  {x:1, y:-1}];

        return directions.reduce((acc, cur) => {
            return acc.concat(this.checkDirection(initialPosition, cur, stone) || [])
        }, []);
    }

    private switchStones(positions: Position[]) {
        positions.forEach((pos) => {
            this.getCell(pos.x, pos.y).switchColor();
        })
    }

    putStone(x: number, y: number, stone: Stone) {
        if (x<0 || x >= this.size || y<0 || y >= this.size || this.getCell(x, y)){
            return false;
        }

        let stonesToSwitch = this.checkField({x: x, y:y}, stone);
        if(stonesToSwitch.length === 0) {
            return false;
        };

        this.setCell(x, y, stone);
        this.switchStones(stonesToSwitch);
        this.remainingTurns--;
        return true;
    }

    isComplete(){
        return (this.remainingTurns <= 0 );
    }
}

/*
const test = new Field(8);

test.showField();
console.log(' ');
test.putStone(2, 3, new Stone(Color.black));
test.showField();

*/