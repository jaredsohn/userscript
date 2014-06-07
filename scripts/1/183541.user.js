// ==UserScript==
// @name         BeachBall
// @description  Enhancements for the Sandcastle Builder game.
// @match        http://castle.chirpingmustard.com/castle.html
// @match	 http://castle.chirpingmustard.com/classic.html
// @version      3.5
// ==/UserScript==


var jA = document.createElement('script');
		jA.setAttribute('type', 'text/javascript');
		jA.setAttribute('src', 'http://xenko.github.io/BeachBall/BeachBall.js?');

setTimeout(function() {
    document.body.appendChild(jA);
}, 1000);