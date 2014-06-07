// ==UserScript==
// @name           Hide Dalmatix
// @namespace      http://www.strawjackal.org
// @description    Hide Dalmatix-powered banner ads
// @include        *
// ==/UserScript==


window.addEventListener(
'load',
function() {document.getElementById('oded').style.display='none';}  ,
true);