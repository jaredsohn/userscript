// ==UserScript==
// @name          Google Reader: Mac OS X Snow Leopard Fixes
// @namespace     http://andrewm.info
// @description	  Fixes a few bugs with the excellent Google Reader theme found here - http://userstyles.org/styles/16900
// @author        Andrew Martin
// @homepage      http://andrewm.info/software
// @match         http://www.google.com/reader/view/*
// @match         https://www.google.com/reader/view/*
// @version       1.0.1
// ==/UserScript==

// fix the recommended box on the left
var recommended = document.getElementsByClassName("lhn-section-footer");
recommended[1].style.background = "#D1D7E2";

// fix the boxes when you mouse over a feed or folder
var righty = document.getElementsByClassName("tree-item-action-container");

for (var i = 0; i < righty.length; i++) { 
        righty[i].style.background = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAVCAIAAAAIMBNTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAADtJREFUCNcFwcERgEAMA7HMfpnr/08FFEJHxGukuZ+Xcy5mSlvSYgYNVpKSyEaqmPAZNpIVW7TUkBTHH1HcNveRCQWLAAAAAElFTkSuQmCC") repeat-x !important'; //"#D1D7E2"; 
}
