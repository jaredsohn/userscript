// ==UserScript==
// @name           Lego!
// @namespace      http://userscripts.org/scripts/show/68095
// @description    Activates copyright infringement for some Lego love.
// @include        http://127.0.0.1:60*/*
// @include        http://*kingdomofloathing.com/*
// @include        http://*forums.kingdomofloathing.com*
// @exclude        http://*images.kingdomofloathing.com*

// ==/UserScript==

	document.body.innerHTML= document.body.innerHTML.replace(/BRICKO[s]?/g,"Lego");
