
import { Stone } from "./stone";
import { Color, Position } from "./constants";

export class Field {
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
        this.setCell({x: centerPosition, y: centerPosition}, new Stone(Color.white));
        this.setCell({x: centerPosition + 1, y: centerPosition},  new Stone(Color.black));
        this.setCell({x: centerPosition, y: centerPosition + 1},  new Stone(Color.black));
        this.setCell({x: centerPosition + 1, y: centerPosition + 1},  new Stone(Color.white));
    }

    private getCell(pos: Position) {
        if (!this.isPositionValid(pos)) {
            return null;
        }
        return this.field[pos.y][pos.x];
    }

    private setCell(pos: Position, stone: Stone) {
        if (!this.isPositionValid(pos)) {
            return;
        }
        this.field[pos.y][pos.x] = stone;
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
        let result: Position[] = [];
        let position = initialPosition;
        while(true) {
            position = {
                x: position.x + step.x,
                y: position.y + step.y,
            }
            let cell = this.getCell(position);
            if(!cell){
                break;
            } else if(cell.getPlayer() == stone.getPlayer()){
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
        }, new Array<Position>());
    }

    private switchStones(positions: Position[]) {
        positions.forEach((pos) => {
            let cell = this.getCell(pos);
            if(cell) {
                cell.switchColor();
            }
        })
    }

    private isPositionValid(position: Position) {
        return !(position.x < 0 || position.x >= this.size || position.y<0 || position.y >= this.size );
    }

    putStone(position: Position, stone: Stone) {
        if (!this.isPositionValid(position) || this.getCell(position)){
            return false;
        }

        let stonesToSwitch = this.checkField(position, stone);
        if(stonesToSwitch.length === 0) {
            return false;
        };

        this.setCell(position, stone);
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
test.putStone({x:2, y:3}, new Stone(Color.black));
test.showField();
*/
