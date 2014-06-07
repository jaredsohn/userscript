// ==UserScript==
// @name           	MyEpisodes.com select as "Watched"
// @namespace   	userXscript
// @author         	userXscript
// @description   	Checks episodes as "Watched" when using the mouseover event instead of click
// @version        	1.0.1
// @include        	https://myepisodes.com/views.php*
// @include        	http://myepisodes.com/views.php*
// @require        	https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

(function () {
	$("table.mylist tbody tr:gt(0)").mouseover(function () {
		$(this).find("input:checkbox").attr('checked', 'checked');
		// $(this).children("td:last").children("input:checkbox").attr('checked', 'checked');
	})
})();