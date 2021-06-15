import me from 'melonjs';
import NetCommunicator from "./js/NetCommunicator";
import game from './js/game';
import resources from './js/resources';
import hud from './js/entities/HUD';
import title from './js/screens/title';
import play from './js/screens/play';
import enemies from './js/entities/enemies';
import hero from './js/entities/hero';
import retep from './js/entities/retep';
import obstacles from './js/entities/obstacles';
import goodies from './js/entities/goodies';



me.device.onReady(function onReady() {
    game.mode = "multiplayer";
    let netCom = new NetCommunicator();
    netCom.connect();
    game.setNetCom(netCom);
    game.onload();
});