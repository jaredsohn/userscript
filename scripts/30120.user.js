// ==UserScript==
// @name           Unpaginate iblist search results
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/30120.user.js
// @description  Marks up IBList search results with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.iblist.com/search/search.php*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

addMeta("pagination-container", '//td[@class="content"]/p');

addMeta("items-xpath", '//td[@class="content"]/ul/li');

/* 
    Unfortunately the IBList general search results pages are not "Next" limited
    In other words, you could keep pressing "Next page" even though no more results exist
    
    So to get around this we need to limit "Unpaginate" by examining the item count header
    to see if the 'ItemStart#' plus the 'ItemsPerPage#' is less than 'ItemTotal#'
*/
var txt = $X('//td[@class="content"]/ul/text()[position()=1]').textContent; // 0 - 50 out of 360
var m = txt.match(/(\d+).*\s(\d+).*\s(\d+)/);

if ( (m[1]*1)+(m[2]*1) < (m[3]*1) )
  addLink("next", $X('//td[@class="content"]/p/a[.="Next"]').href);
