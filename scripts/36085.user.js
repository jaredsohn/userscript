// ==UserScript==
// @name        De-ad Everything2
// @namespace   http://apartmentland.net/~doches/
// @description Removes ads from Everything2
// @include *.everything2.com/*
// @include everything2.com/*
// ==/UserScript==

var adBar = document.getElementsByTagName("div")[0]
if(adBar) {
  adBar.parentNode.removeChild(adBar);
}
