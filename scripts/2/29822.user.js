// ==UserScript==

// @name           Ladder

// @namespace      http://duels.com

// @description    Adds Ladders to upper nav bar

// @include        http://www.duels.com/*

// @include        http://duels.com/*

// ==/UserScript==

var links, newElement;
links = document.getElementById('headerLinks');

if (links) {
    newElement = document.createElement('li');
    links.childNodes[1].insertBefore(newElement, links.childNodes[1].childNodes[5]);
    newElement.innerHTML = "<a href=\"/arena/ladders\">Ladders</a>";
    links.style.fontSize = "12px";
}