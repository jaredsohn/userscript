// ==UserScript==
// @name           vz cleaner
// @namespace      http://hacx.bplaced.net
// @description    Killt den Buschfunk bei schuelervz, studivz und meinvz
// @include        http://*.schuelervz.net/*
// @include        http://*.meinvz.net/*
// @include        http://*.studivz.net/*
// ==/UserScript==

document.getElementById("Mod-Feedbox-Snipplet").style.visibility="hidden";
sp = document.getElementById("Mod-Feedbox-Snipplet");
sp.parentNode.removeChild(sp);