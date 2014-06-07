// ==UserScript==
// @name           YouTube description scrollbar
// @namespace      http://mike.thedt.net
// @description    Adds a scrollbar to video descriptions on YouTube.
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @version        1.1
// ==/UserScript==

//Auto-expand
document.getElementById('watch-info').className = "yt-rounded expanded";
document.getElementById('watch-description').className = "watch-expander yt-uix-expander";

//Add scrollbar
var desc = document.getElementById('eow-description');
if (desc.innerHTML.length>=500) desc.style.height = "200px";
desc.style.overflow = "auto";