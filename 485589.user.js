// ==UserScript==
// @name        html.it Video Widget Remover
// @namespace   https://userscripts.org
// @description remove the video widget from html.it pages
// @include     http://www.html.it/*
// @include     http://forum.html.it/*
// @version     1.1
// @grant       none
// ==/UserScript==

document.getElementById("video_contenitore").innerHTML="<b>Bye Bye<br /><br />by kylon :)</b>";
var targetDiv = document.getElementById("social-share-like");
targetDiv.parentElement.removeChild(targetDiv);