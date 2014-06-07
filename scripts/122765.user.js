// ==UserScript==
// @name           Remove Tracking from DesiDime Forum Links
// @namespace      YourNameHere
// @include        http://www.desidime.com/forums/*
// ==/UserScript==
function removeTracking(e){
  var aels = document.querySelectorAll('a[href^="/links?"]'); // links whose href starts with "/links?"
  for (i=0; i<aels.length; i++){
    aels[i].href = aels[i].href.substr(aels[i].href.indexOf("url=")+4); // replace href with what follows "url="
  }
}
window.setTimeout(removeTracking, 1000); // run after 1 second delay