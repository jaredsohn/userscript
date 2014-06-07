// ==UserScript==
// @name           StudiVZ Bilder speichern
// @namespace      lorenzk
// @description    Zeigt einen Link direkt unter dem Bild zum leichteren runterladen
// @include        http://www.studivz.net/showalbum.php*
// ==/UserScript==

img = document.getElementById("pic");
div = document.createElement("div");
div.align = "center";
link = document.createElement("a");
link.href = img.src;
link.appendChild( document.createTextNode("Bild speichern") );
div.appendChild(link);
document.getElementById("container").appendChild(div);