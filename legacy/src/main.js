//fetch json!

import SpriteLoader from './SpriteLoader';
import Battlefield from './Battlefield';
import Hero from './Hero';
import Observer from './Observer';

var level = fetchLevel();

async function fetchLevel(){
    return fetch('./sprites.json')
    .then(response => response.json())
    .then(data => data)
    .catch(() => "fatal");
}

var battlefield = null;
var elements = [];
var spriteLoader = null;
var observer = null;
var calcInterval = 33;


function onSpritesLoaded(){   

    // load Characters
  //  console.log("sprites loaded");

    elements.push(new Hero(spriteLoader.getCharacter('hero')));

    battlefield = new Battlefield(document.getElementById('battlefield'), elements, calcInterval);

    observer = new Observer();

    setInterval(onRefresh, calcInterval);

}

function onRefresh(){
    battlefield.refresh();
    observer.observe(elements[0]);
    elements[0].calculate(calcInterval);
}

level.then(
    (data) => {
        //console.log(data);
        spriteLoader = new SpriteLoader(data, onSpritesLoaded);
        spriteLoader.loadCharacters();

    }
);




