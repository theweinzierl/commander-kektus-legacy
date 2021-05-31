import me from 'melonjs';
import game from './js/game';
import resources from './js/resources';
import entities from './js/entities/entities';
import hud from './js/entities/HUD';
import title from './js/screens/title';
import play from './js/screens/play';

me.device.onReady(function onReady() {
    game.onload();
});