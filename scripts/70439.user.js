// ==UserScript==
// @name           Facebook feed filter
// @description    Filters Facebook feed items based on regex.
// @namespace      smalltalk80.uiuc
// @include        *.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var patterns = {
		"ENABLED" : "",
		"apps" : "",
		"are now friends" : /\bare now friends\b/,
		"is now friends" : /\bis now friends\b/,
		"commented on" : /\bcommented on\b/,
		"like" : /\blike\b/,
		"likes" : /\blikes\b/
	};

function isNewsFeedPage() {
	return $("#sideNav li:first").hasClass("selectedItem");
}

function addControl() {
	if ($("#feedFilter").size() == 0) {
		$("#rightCol").append('<div id="feedFilter"><h3>Filtering:</h3></div>');
		var i = 0;
		for (var key in patterns) {
			++ i;
			var val = GM_getValue("fbFilter_" + key, "off");
			$("#feedFilter").append('<div><input id="feedFilter_' + i + '" type="checkbox"' + (val == 'on' ? ' checked="checked"' : '') + '/>' + key + '</div>');
			(function() {
				var key_ = key;
				$("#feedFilter_" + i).click(function() {
					var val_ = $(this).attr("checked") ? "on" : "off";
					GM_setValue("fbFilter_" + key_, val_);
					showHideFeeds();
				});
			})();
		}
	}
}

function showHideFeeds() {
	if (isNewsFeedPage()) {
		addControl();

		if (GM_getValue("fbFilter_ENABLED") != "on") {
			$(".uiStreamStory").show();
			return;
		}

		$(".uiStreamPassive").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					var val = GM_getValue("fbFilter_" + key, "off");
					if (val == "on") {
						$(this).parents(".uiStreamStory").hide();
					}
					else {
						$(this).parents(".uiStreamStory").show();
					}
					break;
				}
			}
		});

		var val = GM_getValue("fbFilter_apps", "off");
		if (val == "on") {
			$(".uiStreamStory:has(a[href*='apps.facebook.com'])").hide();
		}
		else {
			$(".uiStreamStory:has(a[href*='apps.facebook.com'])").show();
		}
	}
}

function repeat() {
	showHideFeeds();
	setTimeout(repeat, 5000);
}

$(document).ready(function() {
	repeat();
});
