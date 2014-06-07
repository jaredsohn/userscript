// ==UserScript==
// @name        youtube Like bar green
// @namespace   youtube
// @include     http*://www.youtube.com/*
// @include     https://plus.googleapis.com/*
// @version     1.0
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".video-extras-sparkbar-likes {background: green !important;}" ;
document.body.appendChild(css);