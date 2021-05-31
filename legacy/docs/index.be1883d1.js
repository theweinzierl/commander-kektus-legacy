// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1zAAB":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "bd7020bfe86741806cbc630bbe1883d1"; // @flow
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets/*: {|[string]: boolean|} */ , acceptedAssets/*: {|[string]: boolean|} */ , assetsToAccept/*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    // $FlowFixMe
    ws.onmessage = function(event/*: {data: string, ...} */ ) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH
            );
            // Handle HMR Update
            var handled = false;
            assets.forEach((asset)=>{
                var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
                if (didAccept) handled = true;
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function(e) {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
        errorHTML += `\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          🚨 ${diagnostic.message}\n        </div>\n        <pre>\n          ${stack}\n        </pre>\n        <div>\n          ${diagnostic.hints.map((hint)=>'<div>' + hint + '</div>'
        ).join('')}\n        </div>\n      </div>\n    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    link.getAttribute('href').split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle/*: ParcelRequire */ , asset/*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle/*: ParcelRequire */ , id/*: string */ , depsByBundle/*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle/*: ParcelRequire */ , id/*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"69epD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
//fetch json!
var _spriteLoader = require("./SpriteLoader");
var _spriteLoaderDefault = parcelHelpers.interopDefault(_spriteLoader);
var _battlefield = require("./Battlefield");
var _battlefieldDefault = parcelHelpers.interopDefault(_battlefield);
var _hero = require("./Hero");
var _heroDefault = parcelHelpers.interopDefault(_hero);
var _observer = require("./Observer");
var _observerDefault = parcelHelpers.interopDefault(_observer);
var level = fetchLevel();
async function fetchLevel() {
    return fetch('./sprites.json').then((response)=>response.json()
    ).then((data)=>data
    ).catch(()=>"fatal"
    );
}
var battlefield = null;
var elements = [];
var spriteLoader = null;
var observer = null;
var calcInterval = 33;
function onSpritesLoaded() {
    // load Characters
    //  console.log("sprites loaded");
    elements.push(new _heroDefault.default(spriteLoader.getCharacter('hero')));
    battlefield = new _battlefieldDefault.default(document.getElementById('battlefield'), elements, calcInterval);
    observer = new _observerDefault.default();
    setInterval(onRefresh, calcInterval);
}
function onRefresh() {
    battlefield.refresh();
    observer.observe(elements[0]);
    elements[0].calculate(calcInterval);
}
level.then((data)=>{
    //console.log(data);
    spriteLoader = new _spriteLoaderDefault.default(data, onSpritesLoaded);
    spriteLoader.loadCharacters();
});

},{"./SpriteLoader":"6FA1B","./Battlefield":"1sPzd","./Hero":"662zo","./Observer":"2jFtE","@parcel/transformer-js/src/esmodule-helpers.js":"4gGoX"}],"6FA1B":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = SpriteLoader;
function SpriteLoader(level, onSuccess) {
    this.spritesPath = './sprites/';
    this.level = level;
    this.characters = {
    };
    this.charactersSpriteCount = this.level.spriteCount;
    this.obstacles = {
    };
    this.obstaclesSpriteCount = 0;
    this.onSuccess = onSuccess;
    this.loadCharacters = ()=>{
        let test = this;
        this.level.characters.forEach(function iterateCharacters(character) {
            this.characters[character.name] = {
                name: character.name,
                movements: {
                }
            };
            character.movements.forEach(function iterateMovements(movement) {
                tmpMovement = new Movement(movement.id, movement.amount, movement.fileType, movement.height, movement.width, movement.reference, movement.frameInterval);
                console.log(movement.amount);
                for(i = 0; i < movement.amount; i++){
                    console.log(this.spritesPath + character.name + movement.id + movement.fileType);
                    let tmpImage = new Image();
                    tmpImage.addEventListener('load', this.characterSpriteLoaded);
                    tmpImage.addEventListener('error', (err)=>{
                        console.log(err);
                    });
                    let fileId = '';
                    if (movement.reference !== '') fileId = movement.reference;
                    else fileId = movement.id;
                    if (movement.amount <= 1) tmpImage.src = this.spritesPath + character.name + '_' + fileId + movement.fileType;
                    else tmpImage.src = this.spritesPath + character.name + '_' + fileId + i + movement.fileType;
                    tmpMovement.setSprite(i, tmpImage);
                }
                this.characters[character.name]['movements'][movement.id] = tmpMovement;
            }, test);
        }, test);
    };
    this.characterSpriteLoaded = (ev)=>{
        this.charactersSpriteCount--;
        console.log(this.charactersSpriteCount);
        if (this.charactersSpriteCount === 0) this.levelLoaded();
    };
    this.levelLoaded = ()=>{
        if (this.charactersSpriteCount + this.obstaclesSpriteCount === 0) this.onSuccess();
    };
    this.getCharacter = (characterName)=>{
        console.log(this.characters[characterName]);
        return this.characters[characterName];
    };
}
function Movement(id, amount, fileType, height, width, reference, frameInterval) {
    this.id = id;
    this.amount = amount;
    this.fileType = fileType;
    this.height = height;
    this.width = width;
    this.reference = reference;
    this.sprites = new Array(this.amount);
    this.frameDuration = 0;
    this.frameInterval = frameInterval;
    this.setSprite = (index, image)=>{
        this.sprites[index] = image;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4gGoX"}],"4gGoX":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"1sPzd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = Battlefield;
function Battlefield(battlefield, elements, refreshInterval) {
    this.elements = elements;
    this.battlefield = battlefield;
    this.refreshInterval = refreshInterval;
    this.battlefield.getContext('2d').scale(2, 2);
    this.refresh = ()=>{
        //console.log("refresh!");
        let ctx = this.battlefield.getContext('2d');
        ctx.clearRect(0, 0, this.battlefield.width, this.battlefield.height);
        elements.forEach((element)=>{
            element.draw(ctx, refreshInterval);
        });
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4gGoX"}],"662zo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = Hero;
function Hero(character) {
    this.character = character;
    this.movements = this.character.movements;
    this.curMovement = 'stand';
    this.curSecondaryMovement = 'none';
    this.curDirectionX = 'left';
    this.curDirectionY = 'none';
    this.curMovementId = 'stand_left';
    this.mathDirectionX = 0;
    this.mathDirectionY = 0;
    this.posX = 5;
    this.posY = 2;
    this.speedX = 3;
    this.index = 0;
    this.shootingDuration = 500;
    this.curShootingTime = 0;
    this.jumpHeight = 30;
    this.jumpDirection = 1;
    this.jumpSpeed = 3;
    this.jumpStartPosY = 0;
    this.pogoSpeed = 4;
    this.pogoHeight = 50;
    this.keyRegistrar = {
    };
    this.blockShoot = false;
    setInterval(this.calculate, 100);
    document.addEventListener('keydown', (ev)=>{
        //if(!Object.keys(this.keyRegistrar).includes(ev.key)) return;
        if (ev.key.indexOf('Arrow') !== -1) {
            if (ev.key === 'ArrowLeft') this.keyRegistrar[ev.key] = this.keyRegistrar['ArrowRight'] ? false : true;
            else if (ev.key === 'ArrowRight') this.keyRegistrar[ev.key] = this.keyRegistrar['ArrowLeft'] ? false : true;
            if (ev.key === 'ArrowUp') this.keyRegistrar[ev.key] = this.keyRegistrar['ArrowDown'] ? false : true;
            else if (ev.key === 'ArrowDown') this.keyRegistrar[ev.key] = this.keyRegistrar['ArrowUp'] ? false : true;
        } else this.keyRegistrar[ev.key] = true;
    //  this.processKeyEvent();
    });
    document.addEventListener('keyup', (ev)=>{
        // if(!Object.keys(this.keyRegistrar).includes(ev.key)) return;
        this.keyRegistrar[ev.key] = false;
    //   this.processKeyEvent();
    });
    this.defineDirection = function defineDirection() {
        // define X-direction
        if (this.keyRegistrar['ArrowLeft'] === true) {
            this.curDirectionX = 'left';
            this.mathDirectionX = -1;
        } else if (this.keyRegistrar['ArrowRight'] === true) {
            this.curDirectionX = 'right';
            this.mathDirectionX = 1;
        } else // curDirectionX shall always maintain last direction
        this.mathDirectionX = 0;
        // define Y-direction
        if (this.keyRegistrar['ArrowUp'] === true) {
            this.curDirectionY = 'up';
            this.mathDirectionY = -1;
        } else if (this.keyRegistrar['ArrowDown'] === true) {
            this.curDirectionY = 'down';
            this.mathDirectionY = 1;
        } else {
            this.curDirectionY = 'none';
            this.mathDirectionY = 0;
        }
    };
    this.defineMovement = function defineMovement() {
        // define movement-interrupts
        if ((this.curMovement === 'pogojump' || this.curMovement === 'pogofall') && !this.blockPogo) {
            if (this.keyRegistrar['Control'] || this.keyRegistrar['AltGraph']) this.curMovement = 'fall';
        }
        // define movement
        if (this.curMovement !== 'fall' && this.curMovement !== 'jump' && this.curMovement !== 'pogojump' && this.curMovement !== 'pogofall') {
            if (this.keyRegistrar['Control'] && !this.blockJump) {
                this.curMovement = 'jump';
                this.blockJump = true;
                this.jumpStartPosY = this.posY;
                this.moveY();
            } else if (this.keyRegistrar['AltGraph'] && !this.blockPogo) {
                this.curMovement = 'pogojump';
                this.blockPogo = true;
                this.jumpStartPosY = this.posY;
                this.moveY();
            } else if (this.keyRegistrar['ArrowLeft'] || this.keyRegistrar['ArrowRight']) this.curMovement = 'run';
            else this.curMovement = 'stand';
        }
        if (this.curMovement !== 'pogojump' && this.curMovement !== 'pogofall') {
            if (this.keyRegistrar[' '] && !this.blockShoot) {
                // defines secondary movement shoot
                this.curSecondaryMovement = "shoot";
                this.mathDirectionX = 0;
            }
        }
    };
    this.processKeyEvent = function processKeyEvent() {
        if (this.curSecondaryMovement !== 'shoot') {
            this.defineDirection();
            this.defineMovement();
        }
        this.blockJump = this.keyRegistrar['Control'];
        this.blockPogo = this.keyRegistrar['AltGraph'];
        this.blockShoot = this.keyRegistrar[' '];
    };
    this.moveX = ()=>{
        this.posX = this.posX + this.speedX * this.mathDirectionX;
    };
    this.moveY = ()=>{
        if (this.curMovement === 'jump') this.posY -= this.jumpSpeed;
        else if (this.curMovement === 'fall') this.posY += this.jumpSpeed;
        else if (this.curMovement === 'pogojump') this.posY -= this.pogoSpeed;
        else if (this.curMovement === 'pogofall') this.posY += this.pogoSpeed;
    };
    this.getMovementId = function getMovementId() {
        let returnValue = '';
        let direction = '';
        // set secondary Movement
        if (this.curSecondaryMovement !== 'none') returnValue = this.curMovement + '_' + this.curSecondaryMovement;
        else returnValue = this.curMovement;
        // set principal direction - only consider Y-Direction while shooting and not running!
        if (this.curSecondaryMovement === 'shoot' && this.curMovement !== 'run') {
            if (this.curDirectionY !== 'none') direction = this.curDirectionY;
            else direction = this.curDirectionX;
        } else direction = this.curDirectionX;
        return returnValue + "_" + direction;
    };
    this.draw = (ctx, interval)=>{
        this.curMovementId = this.getMovementId();
        if (this.movements[this.curMovementId].frameInterval <= this.movements[this.curMovementId].frameDuration) {
            this.index = (this.index + 1) % this.movements[this.curMovementId].amount;
            this.movements[this.curMovementId].frameDuration = 0;
        }
        this.movements[this.curMovementId].frameDuration += interval;
        ctx.drawImage(this.movements[this.curMovementId].sprites[this.index], this.posX, this.posY);
    };
    this.calculate = (interval)=>{
        this.processKeyEvent();
        // gets called repeatedly; enables self-controlled animation
        this.moveY();
        this.moveX();
        if (this.curMovement === 'jump') {
            if (this.jumpStartPosY - this.jumpHeight >= this.posY) this.curMovement = 'fall';
        } else if (this.curMovement === 'pogojump') {
            if (this.jumpStartPosY - this.pogoHeight >= this.posY) this.curMovement = 'pogofall';
        }
        this.curShootingTime += interval;
        if (this.curShootingTime >= this.shootingDuration) {
            this.curShootingTime = 0;
            this.curSecondaryMovement = 'none';
        }
    };
    this.invokeCollision = function invokeCollision(vector) {
        if (vector.south.isColliding) {
            if (this.curMovement === 'fall') this.curMovement = 'stand';
            else if (this.curMovement === 'pogofall') this.curMovement = 'pogojump';
        } else if (this.curMovement !== 'jump' && this.curMovement !== 'pogojump' && this.curMovement !== 'pogofall') this.curMovement = 'fall';
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4gGoX"}],"2jFtE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = Observer;
function Observer() {
    this.elements = [];
    this.add = (element)=>{
        this.elements.push(element);
    };
    this.observe = (element)=>{
        this.checkCollision(element);
    //this.bullet();
    };
    this.checkCollision = (element)=>{
        let vector = {
            north: {
                isColliding: false,
                type: null
            },
            east: {
                isColliding: false,
                type: null
            },
            south: {
                isColliding: false,
                type: null
            },
            west: {
                isColliding: false,
                type: null
            }
        };
        if (element.posY < 70) vector.south.isColliding = false;
        else vector.south.isColliding = true;
        element.invokeCollision(vector);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4gGoX"}]},["1zAAB","69epD"], "69epD", "parcelRequiree868")

