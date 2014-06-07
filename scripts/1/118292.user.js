// ==UserScript==
// @name           mitbbs highlight popular threads
// @namespace      smalltalk80.cn
// @description    mitbbs highlight popular threads
// @include        http://www.mitbbs.com/*
// @include        http://mitbbs.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

function highlightPosts() {
	$("td.taolun_leftright tr").find("td:eq(3)").each(function() {
		var s = $(this).text();
		var re = new RegExp("(\\d+)/\\d+", "g");
		var match = re.exec(s);
		if (match != null) {
			var replies = parseInt(match[1]);
			if (replies >= 10) {
				$(this).html("<b>" + s + "</b>");
			}
		}
	});
}

$(document).ready(function() {
	highlightPosts();	
});
