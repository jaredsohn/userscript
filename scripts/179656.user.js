// ==UserScript==
// @name        Google Black Bar Alternative
// @description Add links as an alternative to the removed black bar.
// @include     *.google.com/*
// @version     1.3
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(function () {
    var selector = "div.gb_f.gb_g.gb_h";

    if (window.top == window.self) {
		var execute = function() {
            var buildLink = function(subdom, text) { return '<div style="padding-right:10px"><a style="font-size:14px; color:#808080" href="https://' + subdom + '.google.com?authuser=0">' + text + '</a></div>'; },
			links = buildLink("mail", "Mail")
				+ buildLink("calendar", "Cal")
				+ buildLink("drive", "Drive")
				+ buildLink("www", "Web")
				+ buildLink("images", "Images")
				+ buildLink("maps", "Maps")
				+ buildLink("news", "News");
			$(selector).first().parent().html(links);
		};
		
		var attempts = 0,
			maxAttempts = 5;

		var init = function() {
			var target = $(document).find(selector).first().parent().html();
			if (!target) {
				if (attempts < maxAttempts) {
					setTimeout(init, 1000);
					attempts++;
				} else {
					console.error('Could not find the Google!');
				}
			} else {
				execute();
			}
		};
		
		$(function () {
			init();
		});
	}
});
