// ==UserScript==
// @name           Full Village Messages
// @namespace      BvS-Razithel
// @include        http://www.animecubed.com/billy/bvs/*
// @include        http://animecubed.com/billy/bvs/*
// ==/UserScript==

// Finds all instances of the Village link in the mini-menu
var vLinks = document.getElementsByName("minim6");

// Counts how many instances there are of the Village link in the menu
var vLinksCount = vLinks.length;

// Creates a hidden input element containing showallmess=1
var showHidden = document.createElement("input");
showHidden.setAttribute("type", "hidden");
showHidden.setAttribute("name", "showallmess");
showHidden.setAttribute("value", 1);

// Adds the showallmess=1 input to each instance of the Village link
for (var i=0; i<vLinksCount; i++) {
	vLinks[i].appendChild(showHidden);
}