// ==UserScript==
// @name        Green/red like/dislike bar for youtube 
// @namespace   youtube
// @include     http*://www.youtube.com/*
// @include     https://plus.googleapis.com/*
// @version     1.0
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".video-extras-sparkbar-likes {background: green !important;} .video-extras-sparkbar-dislikes {background: red !important;}" ;
document.body.appendChild(css);