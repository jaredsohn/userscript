// ==UserScript==
// @name         BeachBall-Hotfix
// @description  Enhancements for the Sandcastle Builder game.
// @match        http://castle.chirpingmustard.com/castle.html
// @match	 http://castle.chirpingmustard.com/classic.html
// @version      3.8
// ==/UserScript==


var jA = document.createElement('script');
		jA.setAttribute('type', 'text/javascript');
		jA.setAttribute('src', 'http://hereticorp.github.io/BeachBall-Hotfix/beachball-hotfix.js?');

setTimeout(function() {
    document.body.appendChild(jA);
}, 1000);