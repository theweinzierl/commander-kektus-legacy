# Learnings

## Multiplayer
Für die Kommunikation zwischen Browser-App und Game-Server nutzen wir websockets. In Deno gibt es dazu ein Modul, welches das Aufsetzen eines entsprechenden Servers einfach macht (https://deno.land/x/websocket@v0.1.1/lib/websocket.ts). Standardmäßig bietet das Modul allerdings kein secure websockets, was im Netzwerk zu Problemen führen kann, da manche Browser unsichere remote-websocket-Verbindungen nicht zulassen.
Aus diesem Grund haben wir das websocket-Modul von Deno entsprechend angepasst.
Hierzu sind Änderungen in der depts.ts und ./lib/websocket.ts notwendig. Es muss die serveTLS-Methode aus dem http-standard-Modul importiert werden und die connect-Methode in ./lib/websocket.ts angepasst werden. Statt this.server = serve... muss einfach this.server = serveTLS mit den entsprechenden httpsOptions aufgerufen werden.

Der std-http-Server muss mit host: 0.0.0.0 initialisiert werden, damit Anfragen aus dem LAN etc. angenommen werden.

## Verwendung einer Engine
Zunächst wollten wir das Spiel "from scratch" selbst schreiben. Allerdings haben wir mit der Zeit gemerkt, welcher Aufwand hinter der Entwicklung einer eigenen "Engine" steckt. Die Implementierung von Steuerung, Kollisionsabfragen und Levelediting hätte wahrscheinlich dazu geführt, dass wir nicht zur Programmierung des eigentlichen Spiels gekommen wären. Aus diesem Grund haben wir uns auf die Suche nach bestehenden Web-Game-Engines gemacht und sind dabei auf melon.js und dem Leveleditor Tiled gestoßen, auf denen unser Projekt nun aufbaut.
