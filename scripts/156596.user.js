// ==UserScript==
// @name           Idar Vollvik Facebook Blocker
// @description    Filters Facebook items based on regex.
// @description    Written by Lanjelin
// @include        *.facebook.com/*
// @author         Lanjelin
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var patterns = {
		"Idar Vollvik" : /\bIdar Vollvik\b/,
		"ludostore.no" : /\bludostore.no\b/
	};

function isNewsFeedPage() {
	return $("#sideNav li:first").hasClass("selectedItem");
}

function HideFeeds() {
	if (isNewsFeedPage()) {
		// Likes, friends comments etc.
		$(".uiStreamPassive").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					$(this).parents(".uiStreamStory").hide();
					break;
				}
			}
		});
		// Content in posted text
		$(".uiStreamMessage").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					$(this).parents(".uiStreamStory").hide();
					$(this).parents(".ego_unit").hide();
					break;
				}
			}
		});		
		// Content in Sponsored - name adInfo
		$(".title a").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					var val = GM_getValue("fbFilter_" + key, "off");
					$(this).parents(".ego_unit").hide();
					break;
				}
			}
		});	
		// Content in Sponsored - url 
		$(".adInfo a").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					$(this).parents(".ego_unit").hide();
					break;
				}
			}
		});	
		// Content in recommended
		$(".egoProfileTemplate").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					$(this).parents(".ego_unit").hide();
					break;
				}
			}
		});	
		// Content in tickerfeed
		$(".tickerFeedMessage").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str)) {
					$(this).parents(".fbFeedTickerStory").hide();
					break;
				}
			}
		});	
	}
}

function repeat() {
	HideFeeds();
	setTimeout(repeat, 5000);
}

$(document).ready(function() {
	repeat();
});
