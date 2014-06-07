// ==UserScript==
// @name        world-of-hentai AdBlock hax0r
// @namespace   woh
// @description Ermöglicht die Verwendung der Seite mit Nutzung von AdBlock
// @include     http://*.world-of-hentai.to*
// @version     1
// @grant       none
// ==/UserScript==

document.body.onload = null;

var elemTester = document.createElement("div");
elemTester.setAttribute("id", "tester");
document.body.appendChild(elemTester);