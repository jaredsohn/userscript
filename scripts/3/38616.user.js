// ==UserScript==
// @name          Discogs
// @namespace     http://runlevel6.org/greasemonkey/discogs
// @description   Automatically selects "Catalog #" from the search dropdown and focuses the search field
// @include       http://*discogs.com*
// ==/UserScript==

// INIT
var dropDown    = document.getElementById('type');
var searchInput = document.getElementById('q');

// MAIN
for (var i=0; i<dropDown.options.length; i++) {
  if (dropDown.options[i].value == "catno") {
    dropDown.selectedIndex = i;
    break;
  }
}

searchInput.focus();