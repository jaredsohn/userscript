// ==UserScript==
// @name PureCookie
// @namespace Cookie
// @include http://orteil.dashnet.org/cookieclicker/
// @version 1.2
// @grant none
// ==/UserScript==

var oldOnload = window.onload;
window.onload = function () {
    oldOnload();
    var launchbot=setInterval(function() {if(Game.ready){Launcher();clearInterval(launchbot);}},1000);
}

function Launcher() {
    var script = document.createElement('script');
    script.setAttribute('src', 'http://pastebin.com/raw.php?i=1h7QheqR');
    document.body.appendChild(script);
}