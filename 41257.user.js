// ==UserScript==
// @name           Remove Joystiq 3.0 top 'Hat' bar
// @namespace      joystiq.com
// @description    Removes the black AOL Network bar atop Joystiq. Too dumb to hack that GameDaily thing off, though.
// @include        http://*.joystiq.com/*
// ==/UserScript==

var hat = document.getElementById('hat');
if (hat) {
    hat.parentNode.removeChild(hat);
}