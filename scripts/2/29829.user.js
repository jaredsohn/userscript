// ==UserScript==
// @name           Unpaginate SMF threads
// @namespace    http://userscripts.org/users/35791/scripts
// @url            http://userscripts.org/scripts/source/29829.user.js
// @description    Marks up SimpleMachinesForum threads with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.jimbutcheronline.com/bb/index.php/topic,*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

/***********************************************************************************************
  the rel tag "next" (href='next topic') already exists for view thread pages,
  - edit the rel reference so it doesn't conflict with unpaginate rel "next"
*/
var rel = document.evaluate('//link[@rel="next"]', document, null, 9, null ).singleNodeValue;
if (rel)
  rel.setAttribute("rel", "nextTopic");


addMeta("pagination-container", '(//td[@class="middletext"])[last()]');

addMeta("items-xpath", 'id("quickModForm")//table[@class="bordercolor"]/tbody/tr');

var next = document.evaluate('(//td[@class="middletext"])[last()]/text()[.="] "]',document,null,9,null).singleNodeValue.nextSibling;
if (!isNaN(next.text))
  addLink("next", next.href);
