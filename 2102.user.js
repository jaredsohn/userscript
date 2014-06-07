// ==UserScript==
// @name           Acapela Group link to synthesized sound
// @namespace      http://henrik.nyh.se
// @description    Adds a link to the synthesized sound on the Acapela Group demo pages.
// @include        http://demo.acapela-group.com/demo_bot.asp
// ==/UserScript==

var e = document.getElementsByTagName("embed")[0];
var div = document.getElementsByTagName("div")[0];

var br = document.createElement('br');

var link = document.createElement('a');
link.href = e.src.replace(/\\/g, '/');
link.appendChild(document.createTextNode('Link to file (Right-click, "Copy Link Location")'));

div.parentNode.insertBefore(link, div);
div.parentNode.insertBefore(br, link);
