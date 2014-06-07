// ==UserScript==
// @name           LMGTFY on Google
// @namespace      http://birnbaum2001.org/lmgtfy
// @description    Integrates a link to LMGTFY on google start pages
// @include        http://www.google.*
// ==/UserScript==

setTimeout(function() {
var stats = document.getElementById("resultStats");
var title = document.getElementsByTagName('title')[0].innerHTML;
var search = title.split(" - ")[0];
var link = "http://lmgtfy.com/?q=" + search.replace(/ /, "+");
var lmgtfyLink = document.createElement('a');
lmgtfyLink.href = link;
stats.appendChild(document.createTextNode(" - LMGTFY link: "));
lmgtfyLink.appendChild(document.createTextNode(link));
stats.appendChild(lmgtfyLink);
}, 3000);