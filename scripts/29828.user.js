// ==UserScript==
// @name           Unpaginate SMF topics
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/29828.user.js
// @description  Marks up SimpleMachinesForum fora and sub-fora pages(forum topics) with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include         http://www.jimbutcheronline.com/bb/index.php/board,*
// @include         http://www.jimbutcheronline.com/bb/index.php?*&board=*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

addMeta("pagination-container", '(//td[@class="middletext"])[last()]');

addMeta("items-xpath", '//div[@class="tborder"]/table[@class="bordercolor"]/tbody/tr[not(child::td[@class="catbg3"])]');

var next = document.evaluate('(//td[@class="middletext"])[last()]/text()[.="] "]',document,null,9,null).singleNodeValue.nextSibling;
if (!isNaN(next.text))
  addLink("next", next.href);
