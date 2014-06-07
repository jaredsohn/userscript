// ==UserScript==
// @name           Kaixin001 feed filter
// @description    Filters Kaixin feed items based on regex.
// @namespace      smalltalk80.uiuc
// @include        *.kaixin001.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var patterns = {
		"ENABLED" : "",
		"热门转帖" : /热门转帖/,
		"转帖给" : /转帖给/,
		"转发记录" : /转发记录/,
		"参与了" : /参与了/,
		"送了礼物" : /送了礼物/,
		"成为好友" : /成为好友/,
		"发表了评论" : /发表了评论/,
		"被评论道" : /被评论/,
		"说道：" : /说道：/,
		"更多游戏" : /更多游戏/,
	};

function isNewsFeedPage() {
	return $("#newsdiv").size() != 0;
}

function addControl() {
	if ($("#feedFilter").size() == 0) {
		$("div#head_applist").append('<div id="feedFilter"><h3>Filtering:</h3></div>');
		var i = 0;
		for (var key in patterns) {
			++ i;
			var val = GM_getValue("kxFilter_" + key, "off");
			$("#feedFilter").append('<div><input id="feedFilter_' + i + '" type="checkbox"' + (val == 'on' ? ' checked="checked"' : '') + '/>' + key + '</div>');
			(function() {
				var key_ = key;
				$("#feedFilter_" + i).click(function() {
					var val_ = $(this).attr("checked") ? "on" : "off";
					GM_setValue("kxFilter_" + key_, val_);
					showHideFeeds();
				});
			})();
		}
	}
}

function showHideFeeds() {
	if (isNewsFeedPage()) {
		addControl();

		if (GM_getValue("kxFilter_ENABLED") != "on") {
			$("div.gw1").show();
			return;
		}

		$("div.gw1").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					var val = GM_getValue("kxFilter_" + key, "off");
					if (val == "on") {
						$(this).hide();
					}
					else {
						$(this).show();
					}
					break;
				}
			}
		});
	}
}

function repeat() {
	showHideFeeds();
	setTimeout(repeat, 1000);
}

$(document).ready(function() {
	repeat();
});
