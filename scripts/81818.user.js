// ==UserScript==
// @name           SlickDeals Score Filter
// @namespace      smalltalk80.uiuc
// @include        http://slickdeals.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==


$(document).ready(function() {
		//$("a[id^=thread_title_]").css("font-weight", "normal").css("font-size", "small");
		var minVotes = 5;
		var minScore = 5;
		var re = new RegExp("Votes: (\\d+) Score: (-?\\d+)");
		$("tr[id^=sdpostrow_]").each(function() {
			var s = $("img.concat-thumbs", this).attr("title");
			if (s) {
				var matches = re.exec(s);
				if (matches) {
					var votes = parseInt(matches[1]);
					var score = parseInt(matches[2]);
					if (votes < minVotes || score < minScore) {
						$(this).hide();
					}
				}
			}
			else {
				$(this).hide();
			}
		});
});
