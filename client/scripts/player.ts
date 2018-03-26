import { Color } from "./constants";

export class Player {
    color: Color;

    constructor(color: Color){
        this.color = color;
    }

    getColor() {
        return this.color;
    }
}