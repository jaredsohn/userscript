// ==UserScript==

// @name           Tourney

// @namespace      http://duels.com

// @description    Adds tournaments to upper nav bar

// @include        http://www.duels.com/*

// @include        http://duels.com/*

// ==/UserScript==

var links, newElement;
links = document.getElementById('headerLinks');

if (links) {
    newElement = document.createElement('li');
    links.childNodes[1].insertBefore(newElement, links.childNodes[1].childNodes[5]);
    newElement.innerHTML = "<a href=\"/arena/tournaments\">Tournaments</a>";
    links.style.fontSize = "12px";
}