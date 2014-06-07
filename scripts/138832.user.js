// ==UserScript==
// @name           SideCleaner
// @version        1.0
// @namespace      IWantCoffee
// @author         IWantCoffee
// @description    Removes Hot deal links from the side.

// @include        http://www.battlefieldheroes.com/*

// ==/UserScript== 

var get = document.getElementById('giantLinks');
var get0 = get.childNodes[1];
get.removeChild(get0);
