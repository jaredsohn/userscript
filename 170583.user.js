// ==UserScript==
// @name       Remove PUB
// @version    0.1
// @description  Remvoe a pulicidade do RR
// @match      http://www.osreinos.com/*
// @copyright  2012+, Jrel
// ==/UserScript==

var e=document.getElementsByClassName('zonePubDroiteContenant');
for (var i = 0; i < e.length; i++){
   e[i].innerHTML='';
   }
var e=document.getElementsByClassName('espace_pub_contenu_2');
for (var i = 0; i < e.length; i++){
   e[i].innerHTML='';
   }
