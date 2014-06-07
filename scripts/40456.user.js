// ==UserScript==
// @version 1.2.last
// @name           Gigapedia Linkify
// @date           2011-05-07
// @namespace      http://userscripts.org/scripts/show/40456
// @description    Modifies the outgoing links of books to that of download page of that book. Modifies only the URLs pointing to a gigapedia.com domain. Can recognize such links across the web, across all the pages.
// @include        *
// ==/UserScript==

// THIS SCRIPT NO LONGER WORKS AS ITS TARGET GIGAPEDIA.COM HAS SHUT DOWN.
// THERE WILL BE NO FUTURE UPDATES.
// FEEL FREE TO USE THIS SCRIPT AS A TUTORIAL EXAMPLE. 


(function() {

var gigli_init = function() {

/*
Works gloablly accross all the pages. Affects only the URL within gigapedia.com.
Whenever it encounters any link to Gigapedia item pages, it modifies the corresponding
URL to point directly to the download pages of that item, without going to the usual
gigapedia default of first showing the user comments.
*/

/*
Created by Niraj Prasad (np1@nirajp.8k.com)
http://niraxar.googlepages.com
Version history :
0.0.1 :: Jan 14th 2009
0.0.2 :: Jan 16th 2009 [modified such that comments page can be accessed while inside gigapedia.com domain]
0.0.3 :: Jan 25th 2009 [still more improvements inside gigapedia.com domain]
1.0.0 :: Jan 28th 2009 [cleaned up the code, removed beta tag, changed namespace to official userscripts description]
1.1   :: May 15th 2009 [modified the script so that clicking on Gigapedia links from Google Reader works as desired]
Later changelog only on the script page at userscripts.org
*/

var currpage = window.location.href;
var referr = document.referrer;
var allurls = document.getElementsByTagName('A');
var Max = allurls.length;

if(referr.search(/google\.com\/reader/) != -1)
{ 
   if(window.location.href.search(/gigapedia/) != -1) 
       {
		var to_load = window.location.href;
		to_load = to_load.replace(/gigapedia\.com\/items:view\?eid=/, 'gigapedia\.com\/items:links?eid=');
		to_load = to_load.replace(/&.*$/,'');
		window.location.href = to_load;
      }
}

for(var i = 0; i < Max; i++)
{
if (allurls[i].href.search(/gigapedia\.com\/items/) != -1)
{
   allurls[i].href = allurls[i].href.replace(/gigapedia\.com\/items:view\?eid=/, 'gigapedia\.com\/items:links?eid=');
   allurls[i].href = allurls[i].href.replace(/&.*$/,'');
};
};
};


gigli_init();

})();