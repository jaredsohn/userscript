// ==UserScript==
// @name           mitbbs: (1) highlight popular threads; (2) hide top threads; (3) reduce line height
// @namespace      com.hanjunx
// @description    mitbbs highlight popular threads
// @include        http://www.mitbbs.com/*
// @include        http://mitbbs.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// ==/UserScript==

function highlightPosts() {
	$("td.taolun_leftright tr").find("td:eq(3)").each(function() {
		var s = $(this).text();
		var re = new RegExp("(\\d+)/\\d+", "g");
		var match = re.exec(s);
		if (match != null) {
			var replies = parseInt(match[1]);
			if (replies >= 20) {
				$(this).parent().css('text-shadow','0 1px 1px #ffff00');
			}
		}
	});
}

function hideTop() {
	$("img[alt='提示']").each(function() {
		var tr = $(this).parent().parent().remove();
	});
}

function adjustLineHeight() {
	$("span.black10").remove();
}

$(document).ready(function() {
	hideTop();
	highlightPosts();
	adjustLineHeight();
});
