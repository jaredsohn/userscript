// ==UserScript==
// @name          jpopsuki forum/tracker link changer
// @namespace     http://otterish.co.uk
// @description   a script that changes the forum link back to the tracker so it points at the browse page
// @include       http://mullemeck.serveftp.org*/jps_beta/forum/*
// ==/UserScript==

(function(){

for (var i = 0; i < document.links.length; i++) {
   trackerLink = document.links[i];
   if ( (trackerLink.pathname == '/jps_beta/') && (trackerLink.search == '') ) // Change the link
      trackerLink.search = '?page=browse';
}

})();