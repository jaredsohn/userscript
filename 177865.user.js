// ==UserScript==
// @name Web Prittifier
// @namespace http://sapium.net
// @description Makes the web prittier.
// @version 100
// @include *
// @grant none
// ==/UserScript==

var elmHead = document.getElementsByTagName("head")[0];
var elmStyle = document.createElement("style");
elmStyle.type = "text/css";
elmStyle.innerHTML = "* { cursor: wait; }\nbody, p, body p, body div p { font-family: 'Comic Sans MS', cursive !important; text-transform: uppercase; letter-spacing: 3px; }";
elmHead.appendChild(elmStyle);