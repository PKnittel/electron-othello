import { Stone } from "./stone";
import { Color } from "./constants";


const stone = new Stone(Color.black);

alert(Color[stone.getPlayer()]);
