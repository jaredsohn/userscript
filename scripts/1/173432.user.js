// ==UserScript==
// @name        LibraryThing profile tab
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description Adds a "Profile" tab next to the "Home" tab, like the old LT used to have
// @include     http*://*librarything.tld/*
// @include     http*://*librarything.com/*
// @version     2
// @license     public domain
// @grant       none
// ==/UserScript==

var yourBooksTab = document.getElementById("masttab_books");

if (yourBooksTab) { // It's not there if you're logged out

  var profileTab = yourBooksTab.cloneNode(true);

  profileTab.id = "masttab_profile";
  profileTab.className = "sitenav_item g2"; // So that it doesn't get "selected" if you're on the catalog. Not sure what "g2" is for, but leaving it in anyway.
  profileTab.href = profileTab.href.replace("/catalog/","/profile/");
  profileTab.textContent = "Profile";
  yourBooksTab.parentNode.insertBefore(profileTab, yourBooksTab);
  
}