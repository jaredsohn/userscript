// ==UserScript==
// @name        Stop Asking Youtube
// @namespace   Screw Youtube
// @description Stops youtube.com from asking you to use your real name!
// @include     http://www.youtube.com/*
// @version     1
// ==/UserScript==
var p = document.getElementsByClassName('yt-dialog-fg-content');
for (var i=p.length; --i>=0;) {
    p[i].parentNode.removeChild(p[i]);
}