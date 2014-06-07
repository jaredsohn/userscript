// ==UserScript==
// @name PureCookie
// @namespace Cookie
// @include orteil.dashnet.org/cookieclicker/
// @version 1.0
// @grant none
// ==/UserScript==

var oldOnload = window.onload;
window.onload = function () {
    oldOnload();
    var launchbot=setInterval(function() {if(Game.ready){Launcher();clearInterval(launchbot);}},1000);
}

function Launcher() {
    var script = document.createElement('script');
    script.setAttribute('src', 'http://pastebin.com/raw.php?i=ur9DBHwu');
    document.body.appendChild(script);
}