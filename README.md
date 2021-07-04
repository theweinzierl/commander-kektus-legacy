# Commander Kektus

## About
Commander Kektus ist ein Mini-Jump&Run und eine kleine Hommage an Commander Keen von id-Software (https://de.wikipedia.org/wiki/Commander_Keen), welches im Rahmen der Vorlesung "Webprogrammierung" an der DHBW Mannheim entsteht. Es bietet einen Single- und Multiplayer.

![demoscreen](demoscreen.png)

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

Der lokale Server wird mit `npm run start` gestartet. Besser ist es aber den https-Server zu verwenden: `npm run start-https`
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
deno run --allow-net --allow-read ./server.ts 
```

## Hosting des Game-Servers
Der Game-Server läuft als ec2-Instanz bei aws und ist unter der IP 18.192.24.53 erreichbar. Auf Port 8080 lauscht der WebsocketServer. Auf Port 1234 läuft ein akuteller Multiplayer-Build des Spiels.
