// ==UserScript==
// @name          PetFinder Corrector
// @description   Site-specific extension of PetFinder
// @match       http://*.petfinder.com/*
// ==/UserScript==


var petlinks = document.getElementsByClassName("petlink");
for (var i=0; i<petlinks.length; ++i) {
  petlinks[i].removeAttribute("onclick");
}