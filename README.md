# Commander Kektus

## About
Commander Kektus ist ein Mini-Jump&Run und eine kleine Hommage an Commander Keen von id-Software (https://de.wikipedia.org/wiki/Commander_Keen), welches im Rahmen der Vorlesung "Webprogrammierung" an der DHBW Mannheim entsteht.

## Spielen
### aktueller Build
https://theweinzierl.github.io/commander-kektus/

### Steuerung
- Links/ Rechts: Cursor-Taste links/ rechts
- Springen: Cursor-Taste hoch
- Schießen: Leertaste

## technische Aspekte

### Frontend und Spiellogik

- Engine: melon.js (https://www.melonjs.org/)
- Frontend: angular.js
- Netzwerk: websocket-API (https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- Bundler: Parcel2 (https://v2.parceljs.org/)

Installation/ Nutzung
```shell
git clone https://github.com/theweinzierl/commander-kektus && \
cd commander-kektus && \
npm install
```

Der lokale Server wird mit `npm run start` gestartet.
Ein Build kann mit `npm run deploy` erstellt werden.

### Backend/ Game-Server

Der Game-Server erfüllt folgende Funktionen
- Anmeldung
- Spielvermittlung
- Datenaustausch

und setzt Deno und das websocket-Modul ein (https://deno.land/x/websocket@v0.1.1)

Installation/ Nutzung

Wenn noch nicht geschehen clone und cd wie oben. Dann:
```shell
deno run --allow-net  ./server.ts
```
