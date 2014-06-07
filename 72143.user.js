// ==UserScript==
// @name           Grooveshark bez reklam
// @namespace      groovershark
// @include        http://listen.grooveshark.com/*
// ==/UserScript==

var doc = document;
function removeAd(){
  var panel = doc.getElementById('adBar');
  panel.style.display = 'none';
  var mainContentWrapper = doc.getElementById('mainContentWrapper');
  mainContentWrapper.style.marginRight = "0px";
}
removeAd();
document.addEventListener("load", removeAd, true);

 


