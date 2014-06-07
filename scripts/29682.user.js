// ==UserScript==
// @name           Unpaginate phpbbV2 topics
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/29682.user.js
// @description  Marks up phpbbv2 fora and sub-fora pages(forum topics) with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.ibdof.com/viewforum.php*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

var posts = '//table[@class="forumline"]/tbody/tr[not(child::th) and not(child::td/img[contains(@src,"folder_announce")])]';
var next = '//span[@class="nav"]/a[.="Next"]';

// does "Next" link exist? - remove the table footer in anticipation of the user scrolling to 'next page'
var link = $X(next), nodes = $x(posts);
if (link && nodes.length > 2) {
  var last = nodes.length-1;
  nodes[last].parentNode.removeChild(nodes[last]); // remove table footer
}

unpaginate(posts, next, '//span[@class="nav" and starts-with(text(),"Goto page")]');
