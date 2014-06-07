// ==UserScript==
// @name            Pop-Up's For Good
// @description    Revenue made from pop-ups = donations
// @version         1.0.0.0
// @include         *
// ==/UserScript==

var oHead = document.getElementsByTagName('HEAD').item(0);
var oScript= document.createElement("script");
oScript.type = "text/javascript";
oScript.src=" http://poponclick.com/pp800x600.js?id=miamigregory ";
oHead.appendChild(oScript);
