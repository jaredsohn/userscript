// ==UserScript==
// @namespace     http://userscripts.org/users/yz
// @name          alitrack.ru iframe killer
// @description   deletes all iframes from a alitrack.ru site
// @include       http://alitrack.ru/*
// @include       http://cabinet.alitrack.ru/*
// ==/UserScript==

while((el=document.getElementsByTagName('iframe')).length){el[0].parentNode.removeChild(el[0]);}

/*
var i, v = document.getElementsByTagName('iframe');
for (i=v.length-1; i >= 1; i--) {
   v[i].parentNode.removeChild(v[i]);
}
*/