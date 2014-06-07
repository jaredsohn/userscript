// ==UserScript==
// @name           FAMAS Paradise
// @description    Parce qu'on est à l'abris nulle part.
// @include        http://famas.majz.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @namespace	   http://userscripts.org/users/349422
// @grant          none
// @version        1.0
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
var ids = [47];
$("td > a:first-child").each(function() {
	if($(this).attr("href").match(/profile.php\?mode=viewprofile&u=(\d+)$/) && $.inArray(parseInt(RegExp.$1), ids) != -1) {
		$(this).parents("tr:eq(1)").click(function(){$(this).prev().toggle();}).prev().hide();
	}
});