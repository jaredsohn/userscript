// ==UserScript==
// @name           YouTube Box and Button Enabler
// @namespace      YouTube Enabler
// @description    Every ten seconds this very basic script will re-enable any greyed-out input boxes, buttons and textareas, so you can repost comments that didn't work the first time, without retyping.  You could easily enable this on any other site and it will probably work there too.
// @include        http://*youtube.com/*
// ==/UserScript==

makeItSo = setInterval(accessAllAreas, 10000);
function accessAllAreas(){
x=0;
do {document.getElementsByTagName('textarea')[x].disabled=false;x++} while (document.getElementsByTagName('textarea').length>x);
x=0;
do {document.getElementsByTagName('input')[x].disabled=false;x++} while (document.getElementsByTagName('input').length>x);
}