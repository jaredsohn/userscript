// ==UserScript==
// @name        Marktplaats Topadvertentie Hider
// @namespace   bezoeker
// @include     http*://vernieuwd.marktplaats.nl/*
// @version     1
// @grant       none
// ==/UserScript==

var priority_spans = document.querySelectorAll("td .mp-listing-priority-product");
var i, parent;
for (i=0; i<priority_spans.length; i++){
  if (priority_spans[i].textContent.indexOf("Topadvertentie")>-1){
    parent = priority_spans[i];
    while (parent.nodeName != "TR"){
      parent = parent.parentNode;
    }
    parent.style.display = "none";
  }
}