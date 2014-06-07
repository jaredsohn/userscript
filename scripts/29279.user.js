// ==UserScript==
// @name           Unpaginate phpbbV3 threads
// @namespace    http://www.phpbb.com
// @url              http://userscripts.org/scripts/source/29279.user.js
// @description  Marks up phpbbV3 threads with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://*.phpbb.com/*/viewtopic.php*
// ==/UserScript==

// Apart from the code needed for a phpbbV3 site to "play nice", 
//   all other code is "borrowed" from Johan Sundström's pagination microformat producer scripts.
// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

var posts = 'id("page-body")/div[contains(@class,"post")]';
var next = 'id("viewtopic")/fieldset/a[.="Next"]';
var link = $X(next), nodes = $x(posts);
if (link && nodes.length > 1) {
  var div = nodes[0].parentNode.insertBefore(document.createElement("div"), nodes[0]);
  div.setAttribute("id", "unpaginate_wrapper");
  for (var i=0, e; i<nodes.length; i++) {
    div.appendChild(nodes[i]);
  }
  posts = 'id("unpaginate_wrapper")/div';
}

unpaginate(posts, next, '(//div[@class="pagination"])[last()]/span');
