// ==UserScript==
// @name           BF:Heroes List Fixer
// @namespace      FrostedFreeze
// @description    Fixes the list on BF:Heroes
// @include        http://www.battlefieldheroes.com/*
// @include        https://www.battlefieldheroes.com/*
// ==/UserScript==

var nav = document.getElementById('header').childNodes[1];
var l = [nav.childNodes[7], nav.childNodes[11], nav.childNodes[13]];
l[0].parentNode.insertBefore(l[1], l[0]);
l[0].parentNode.insertBefore(l[0], l[2]);