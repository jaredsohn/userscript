// ==UserScript==
// @name           Add tag searches to the menubar
// @namespace      http://www.google.com
// @description    Adds tag searches to the menubar
// @include        http*://*what.cd*
// ==/UserScript==
(function() {
	var target = document.getElementById('searchbars').getElementsByTagName('li'); /* Searchbars */

	target[5].innerHTML += '<center><a href="/torrents.php?artistname=&taglist=rock&tags_type=1&order_by=time&order_way=desc">Rock</a>&nbsp; / &nbsp;<a href="/torrents.php?artistname=&taglist=pop&tags_type=1&order_by=time&order_way=desc">Pop</a></center>';
})();