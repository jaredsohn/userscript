// ==UserScript==
// @name          Funtrivia Treasure Hunt
// @namespace     http://flatluigi.googlepages.com/scripts
// @description	Just to make sure you won't miss it.
// @include 	http://*funtrivia.com/*
// ==/UserScript==

(function() {
  if (document.body.innerHTML.indexOf("Treasure Hunt</a> Clue #") > -1) {
		alert("You have a new treasure hunt clue!");
  } 
})();