// ==UserScript==
// @name           Supprime liens
// @namespace      http://bordeaux.onvasortir.com
// @include        http://*.onvasortir.com/*
// ==/UserScript==

document.getElementsByClassName("ColorRed")[0].parentNode.removeChild(document.getElementsByClassName("ColorRed")[0])
document.getElementsByClassName("liens2")[0].parentNode.removeChild(document.getElementsByClassName("liens2")[0])
document.getElementsByClassName("new_sortiepartenaire")[0].parentNode.removeChild(document.getElementsByClassName("new_sortiepartenaire")[0])
