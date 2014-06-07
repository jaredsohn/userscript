// ==UserScript==
// @name           Remover banner superior prensalibre.com
// @include        http://www.prensalibre.com/*
// ==/UserScript==

var div = document.getElementById('doc8');
var divs = div.getElementsByTagName('div');
div.removeChild(divs[0]);