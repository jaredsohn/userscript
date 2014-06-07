// ==UserScript==
// @name           Key Unblocker for virsanghvi.com
// @namespace      http://zaiki.in
// @description    Unblocks right click and key presses on virsanghvi.com
// @include http://www.virsanghvi.com/*
// ==/UserScript==

window.releaseEvents(Event.KEYPRESS);
window.releaseEvents(Event.MOUSEDOWN);
window.releaseEvents(Event.MOUSEUP);

document.onkeydown=true;
document.onmousedown=true;
document.onmouseup=true;
window.document.layers=true;
