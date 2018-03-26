import { Stone } from "./stone";
import { Color } from "./constants";
import { Player } from "./player";

const player = new Player(Color.black);

const stone = new Stone(player.getColor());

alert(Color[stone.getPlayer()]);
