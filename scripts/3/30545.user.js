// ==UserScript==
// @name           Unpaginate IP.Board threads
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/30545.user.js
// @description  Marks up IP.Board threads with the Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://asoiaf.westeros.org/index.php?showtopic=*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

/*
    Need to move the DIV "barc" [search form+next/prevous topic] 
      out of it's current container otherwise it becomes
      grid-locked by future paginated posts.
*/
if (self.location == top.location) {
  var barc = $X('//div[@class="borderwrap"]/div[@class="barc"]');
  // shuffle it to the parents next sibling 
  barc.parentNode.parentNode.insertBefore(barc,barc.parentNode.nextSibling);
}

unpaginate('//div[@class="borderwrap"]/table[@class="ipbtable"]',
           'id("page-jump-2")/../span/a[.=">"]',
           'id("page-jump-2")/..');
