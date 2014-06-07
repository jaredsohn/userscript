// ==UserScript==
// @name          tagesschau.de Auto-Open Video
// @namespace     http://www.it99.org/axl/
// @description
// @include       http://www.tagesschau.de/sendungen/*
// ==/UserScript==

// Make sure the site has been loaded and all onLoad scripts have run. This
// ensures that the player prefs are set correctly on the client side.
window.addEventListener(
    'load',
    function() { document.getElementsByName("play")[0].click(); },
    true);