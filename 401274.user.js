// ==UserScript==
// @name           PS Interstice Disabler
// @description    Removes the useless interstice page on PS
// @match          *://*.pokemonshowdown.com
// @match          *://*.pokemonshowdown.com/*
// @match          *://*.psim.us
// @match          *://*.psim.us/*
// @version        1.0
// ==/UserScript==

$(function() {
    Tools.interstice.isWhitelisted = function(uri) { return true; };
});