// ==UserScript==
// @name           Remove WOT ad
// @description    Removes the Web of Trust addon's ad from the top of all Google web searches.
// @include        http://*.google.com/search?q=*
// ==/UserScript==

var elemToDelete = document.getElementById("scTopOfPageRefinementLinks");
elemToDelete.parentNode.removeChild(elemToDelete);