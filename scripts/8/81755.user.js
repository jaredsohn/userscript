// ==UserScript==
// @name LyricWiki Enable Right Click
// @description Enables right click on LyricWiki
// @include http://lyrics.wikia.com/*
// ==/UserScript==

function main() {
var script = window.document.createElement("script");
var code = "$('body').unbind();";
script.innerHTML = code;
window.document.body.appendChild(script);
return 0;
}

window.addEventListener('load', function(e) { main(); }, false);
