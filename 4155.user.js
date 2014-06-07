// ==UserScript==
// @name          jpopsuki link fixing script
// @namespace     http://otterish.co.uk
// @description   fixes some buggy/broken links on the torrents pages of jpopsuki
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=browse*
// ==/UserScript==

(function(){

var SearchCat, searchCatStart, searchCatEnd, redirectTo, thisLoc, thisDiv;

thisLoc = document.URL;

if (thisLoc.indexOf('needseed=1') > 0)
   redirectTo = '&needseed=1';
else if (thisLoc.indexOf('top=1') > 0)
   redirectTo = '&top=1';


for (var i = 0; i < document.links.length; i++) {
   thisDiv = document.links[i];
   if (thisDiv.search) {
      if (thisDiv.search == '?page=browse&filter_cat=') // Fix the "View all jpopsuki releases" link
         thisDiv.search += '6';
      else if ( (thisDiv.search.substr(0,19) == '?page=browse&bpage=') && (redirectTo != null) ) // Look for browse page # links
         thisDiv.search += redirectTo;
   }
}

})();