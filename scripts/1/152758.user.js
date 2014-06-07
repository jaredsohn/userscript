// ==UserScript==
// @name        Marktplaats dienstverlening advertentie Hider
// @namespace   bezoeker
// @include     http*://vernieuwd.marktplaats.nl/*
// @version     1
// @grant       none
// ==/UserScript==

var priority_spans = document.querySelectorAll("td .votes");
var i, parent;
for (i=0; i<priority_spans.length; i++){
  if (priority_spans[i].textContent.indexOf("x")>-1){
    parent = priority_spans[i];
    while (parent.nodeName != "TR"){
      parent = parent.parentNode;
    }
    parent.style.display = "none";
  }
}