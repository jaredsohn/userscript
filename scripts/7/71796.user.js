// ==UserScript==
// @name           Add tag searches to the menubar (decibel)
// @namespace      http://www.google.com
// @description    Adds tag searches to the menubar (decibel)
// @include        http*://*what.cd*
// ==/UserScript==
(function() {
	var target = document.getElementById('userinfo_minor').getElementsByTagName('li'); /* Searchbars */

	target[6].innerHTML += '<center><a href="/torrents.php?artistname=&taglist=rock&tags_type=1&order_by=time&order_way=desc">Rock</a>&nbsp; / &nbsp;<a href="/torrents.php?artistname=&taglist=pop&tags_type=1&order_by=time&order_way=desc">Pop</a></center>';
})();