import { Color } from "./constants";

export class Stone {
    color: Color;

    constructor(color: Color) {
        this.color = color;
    }

    switchColor() {
        this.color = (this.color + 1) % 2 ;
    }

    getPlayer() {
        return this.color;
    }
}
