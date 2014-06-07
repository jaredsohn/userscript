// ==UserScript==
// @icon http://www.majstorov.info/images/prc.jpg
// @name VeljaWay
// @version 0.01
// @author r0073rr0r
// @namespace  http://userscripts.org/users/550051
// @description Bring back old dropbox on Soccerway
// @match      http://*.soccerway.com/*
// @copyright  2014+, Velimir Majstorov
// @downloadURL		http://userscripts.org/scripts/source/371854.user.js
// @updateURL		http://userscripts.org/scripts/source/371854.meta.js
// ==/UserScript==

var elements = document.getElementsByClassName('nav-select');
for(var i=0, l=elements.length; i<l; i++){
 elements[i].style.display = "inherit";
 elements[i].style.marginTop = "10px";
}

var elementsw = document.getElementsByClassName('label-wrapper');
for(var b=0, l=elementsw.length; b<l; b++){
 elementsw[b].style.display = "none";
}