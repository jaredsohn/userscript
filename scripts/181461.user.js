// ==UserScript==
// @name           Pur Asile
// @description    Cache les posts indésirables.
// @include        http://www.lesitedecuisine.fr/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @namespace	   http://userscripts.org/scripts/review/181461
// @grant          none
// @version        1.0
// ==/UserScript==

var ids = [2507];
$("li > a:first-child").each(function() {
	if($(this).attr("href").match(/profile.php\?id=(\d+)$/) && $.inArray(parseInt(RegExp.$1), ids) != -1) {
	   $(this).parents("div:eq(1)").hide();
		$(this).parents("div:eq(1)").prev().click(
		function(){
		$(this).parents().children("div:eq(1)").toggle();
		});
	}
});