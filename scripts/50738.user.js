// ==UserScript==
// @name           Remove search highlighting from DDL sites.
// @namespace      blurg!
// @description    Remove search highlighting from DDL sites.
// @include        http://bayw.org/search.php?mode=results
// @include        http://www.warez-bb.org/search.php?mode=results
// @include        http://forumw.org/search.php?mode=results
// @include        http://www.projectw.org/search.php?keywords*
// @include        http://www.thecavernforum.com/forums/index.php?act=Search*
// @include        http://www.needz.org/forum/index.php?act=Search*
// @include        http://www.docs4you.org/forum/index.php?act=Search*
// @include        http://www.warezforum.info/search.php?searchid=*
// @include        http://bayw.org/search.php?search_id=*
// @version        0.3
// ==/UserScript==

var getAllA = document.getElementsByTagName('a');

for(var i in getAllA){

	if(getAllA[i].hasAttribute('href')){
		getAllA[i].href = getAllA[i].href.split('&highlight=')[0].split('&hl=')[0].split('&hilit=')[0];
	}
}
