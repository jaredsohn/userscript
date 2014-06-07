// ==UserScript==
// @name           View Verse Toggler
// @description    View verse or paragraphs
// @include        http://*biblia.com/*
// ==/UserScript==

var newEl = document.createElement('div');
newEl.innerHTML = "<a id=\"ToggleButton\" style=\"cursor:pointer;\">Toggle View</a>";
var ah = document.getElementById('account-header');
ah.appendChild(newEl);
var styleEl = document.createElement('style');
styleEl.id = "verseStyle";
 styleEl.innerHTML = "";
var headID = document.getElementsByTagName("head")[0];
headID.appendChild(styleEl);

newEl.addEventListener('click', function() {    
  var styleEl = document.getElementById('verseStyle');
  if (styleEl.innerHTML == " p span { display: table-cell; }") {
    styleEl.innerHTML = " p span { display: inline; }";   
  } else {
    styleEl.innerHTML = " p span { display: table-cell; }";
  }
  
}, false);