// ==UserScript==
// @name           Show current text for klavogonki race
// @version        0.01
// @namespace      klavogonki
// @author         Silly_Sergio
// @description    Whenever user starts a new race, alert with current text will show up.
// @include        http://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==

function embed() {
    setTimeout(function(){alert(this.game.text);},3000);
}

var inject = document.createElement("script");
inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + embed + ")()"));
window.onload(embed());