// ==UserScript==
// @name Greasemonkey GoogleBack
// @namespace https://github.com/JanisE
// @description Project URL: https://github.com/JanisE/greasemonkey-googleback
// @include *.google.*
// @version 2
// @grant none
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "#res h3.r a, li.ads-ad h3 a {font-size: 16px !important; text-decoration: underline}";
document.head.appendChild(css);
