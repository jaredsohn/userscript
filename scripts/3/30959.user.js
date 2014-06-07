// ==UserScript==
// @name           Unpaginate DIGG summary pages
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/30959.user.js
// @description  Marks up DIGG summary pages with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://digg.com/*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

var pages = $X('//div[@class="pages"]');
if (pages) {
  /*
      Need to move the DIV ".pages" [<<previous - pages - next>>] 
        out of it's current container otherwise it becomes
        grid-locked by future paginated posts.
  */
  if (self.location == top.location) {
    // shuffle it to the parents next sibling 
    pages.parentNode.parentNode.insertBefore(pages,pages.parentNode.nextSibling);
  }

  unpaginate('//div[starts-with(@id,"enclosure")]',
             '//div[@class="pages"]/a[starts-with(.,"Next")]',
             '//div[@class="pages"]');
}