// ==UserScript==
// @name SFC Message board link replace - Show both
// @description Replaces the destination of the Message Board link at the bottom of the startfleet commander games
// @include http://*playstarfleet*
// ==/UserScript==

var vA=document.getElementsByTagName('a');
var vLink2=document.createElement('a');
vLink2.setAttribute('href','http://gollstrom.com/sfco/');
vLink2.setAttribute('target','http://forum.playstarfleet.com/');
vLink2.innerHTML="Unofficial Message Board";
for(i=0;i<vA.length;i++){if(/message board/im.test(vA[i].innerHTML)){vA[i].parentNode.insertBefore(vLink2,vA[i].nextSibling);}}