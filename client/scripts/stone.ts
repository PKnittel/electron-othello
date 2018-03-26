export enum Color {
    white,
    black,
}

export class Stone {
    player: Color;

    constructor(player: Color) {
        this.player = player;
    }

    switchColor() {
        this.player = (this.player + 1) % 2 ;
    }

    getPlayer() {
        return Color[this.player];
    }
}