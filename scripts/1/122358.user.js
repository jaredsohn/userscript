// ==UserScript==
// @name           Not Very Effective
// @version        0.1
// @author         Wil Langford, userscripts@trustissues.net
// @namespace      http://fanglord.net/wiki/
// @description    Meme-value-added poke messages.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

document.body.innerHTML = 
document.body.innerHTML.replace(
   /has poked you\./g,
   "uses Poke on you. It's not very effective."
);