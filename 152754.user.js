// ==UserScript==
// @name           Facebook Chat Filter
// @description    Filters Facebook Chat items based on regex.
// @include        *.facebook.com/*
// @author         Lanjelin
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var patterns = {
		"ENABLED" : "",
		"Captain Jack" : /\bCaptain Jack\b/,
		"Lanjelin" : /\bLanjelin\b/,
		"Mr. Froglegs" : /\bFroglegs\b/,
		"Johhny Bravo" : /\bJohhny Bravo\b/
	};

function isNewsFeedPage() {
	return $("#sideNav li:first").hasClass("selectedItem");
}
function addControl() {
	if ($("#feedFilter").size() == 0) {
		$("#leftCol").append('<div id="feedFilter" style="margin-top:15px;"><a style="color:#999999; font-weight:bold;">Filtering</a></div>');
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
		$(".name").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					var val = GM_getValue("fbFilter_" + key, "off");
					if (val == "on") {
						$(this).parents(".item").hide();
					}
					else {
						$(this).parents(".item").show();
					}
					break;
				}
			}
		});
	}
}
function repeat() {
	showHideFeeds();
	setTimeout(repeat, 5000);
}
$(document).ready(function() {
	repeat();
});
