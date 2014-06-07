// ==UserScript==
// @name        4chan GIF loader
// @namespace   TeNNoX
// @description Auto-loads GIFs so they're directly showing on the page!
// @include     http://boards.4chan.org/*
// @version     1
// ==/UserScript==

var thumbs = document.getElementsByClassName("fileThumb");
for(var i = 0; i < thumbs.length; i++) {
var thumb=thumbs[i];
thumb.firstChild.src = thumb.href;
}