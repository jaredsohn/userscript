// ==UserScript==
// @name           Pro Website Addition 
// @namespace      prowebsite
// @description    adds pro website to bottom of page
// @include        http://*playstarfleet*
// ==/UserScript==


var vA=document.getElementsByTagName('a');
var vLink2=document.createElement('a');
vLink2.setAttribute('href','http://pro.totalgamehost.com/');
vLink2.setAttribute('target','http://forum.playstarfleet.com/');
vLink2.innerHTML="Pro Website";
for(i=0;i<vA.length;i++){if(/message board/im.test(vA[i].innerHTML)){vA[i].parentNode.insertBefore(vLink2,vA[i].nextSibling);}}