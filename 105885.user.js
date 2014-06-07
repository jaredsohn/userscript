// ==UserScript==
// @name SFC Message board link replace
// @include http://*playstarfleet*
// ==/UserScript==

var vA=document.getElementsByTagName('a');
for(i=0;i<vA.length;i++){if(/message board/im.test(vA[i].innerHTML)){vA[i].setAttribute('href','http://gollstrom.com/sfco/');}}