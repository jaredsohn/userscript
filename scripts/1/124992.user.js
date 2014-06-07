// ==UserScript==
// @name           Nordea Keep-Alive
// @namespace      Nordea
// @description    Forsøger at kalde Keep-Alive function hvert 2. minut (for at forhindre timeout)
// @include        https://www.nordeanetbank.dk/*
// @include        https://*.nordeanetbank.dk/
// @author         Jacob Kamp Hansen
// ==/UserScript==
setInterval(function() {
mcpHideLayer && mcpHideLayer();
}, 2*60000);