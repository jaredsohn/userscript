// ==UserScript==
// @name        Licznik nowych komentarzy ZnR
// @namespace   jary
// @include     http://ziemianarozdrozu.pl/
// @version     3
// ==/UserScript==
if ($) {
	$(document).ready(function() {
		var $links = $("ul.fl a");
		var sum_diff = 0;
		for (var i = 0, n = $links.size(); i < n; i++) {
			var $link = $($links[i]);
			var href = $link.attr('href');
			var art_id = /\d+/g.exec(href);
			var text = $link.text();
			var curr_num = /\d+/g.exec(text);
			if (curr_num != null) {
				var prev_num = localStorage["counters." + art_id];
				localStorage["counters." + art_id] = curr_num;
				if (prev_num == null) {
					prev_num = 0;
				}
				var diff = curr_num - prev_num;
				if (diff > 0) {
					$link.append("<span style='color:red'> (+" + diff + ")</span>");
				}
				sum_diff += diff;
			}
		}
		$("h2:first").before($("<h2 id='new_comments'>Nowych komentarzy: " + sum_diff + "</h2>").css({'margin-top':'0', 'color':'red'}));
	});
}