// ==UserScript==
// @name           Dice Keywords Input Focus
// @namespace      http://kuzmeech.blogspot.com/
// @description    Focus on Keywords as page opens
// @include        http://www.dice.com/
// ==/UserScript==

var input = document.getElementById("FREE_TEXT");

input.value = "";
input.focus();