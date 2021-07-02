import me from 'melonjs';
import game from './js/game';
import resources from './js/resources';
import title from './js/screens/title';
import play from './js/screens/play';
import enemies from './js/entities/enemies';
import hero from './js/entities/hero';
import retep from './js/entities/retep';
import obstacles from './js/entities/obstacles';
import goodies from './js/entities/goodies';

me.device.onReady(function onReady() {

    // entry point of the game

    // inspect url-query to set proper mode and username

    const gameParams = new URLSearchParams(window.location.search);
    const modeParam = gameParams.get("mode");
    let nameParam = gameParams.get("name");

    if(nameParam === null) nameParam = "Michael";

    if(modeParam !== null && modeParam === "multiplayer"){
        game.setMode("multiplayer");        
        game.setPlayerName(nameParam);   
    }else{
        game.setPlayerName(nameParam);
        game.setMode("singleplayer");
    }
        
    game.onload();
});