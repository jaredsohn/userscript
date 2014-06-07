// ==UserScript==
// @name           Aprocalypse's Who's that title by?
// @namespace      http://kolmods.com/aprocalypse/
// @description    Version 0.0 - Adds who gave title after the title, instead of mouseover.
// @include        http://*kingdomofloathing.com/showplayer.php*
// @include        http://127.0.0.1:60*/showplayer.php*
// ==/UserScript==

// This is customisable if you change the style line to whatever % you want. Or to a pt size, or whatever. I don't really care.
var spanArray = document.getElementsByTagName('span');
content = spanArray[0].title;
newElement = document.createElement('span');
newElement.style.fontSize = "75%";
newElement.innerHTML = ' <br/>'+ content;
spanArray[0].parentNode.insertBefore(newElement, spanArray[0].nextSibling);
