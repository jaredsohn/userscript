// ==UserScript==
// @name        FB_PoliticsFilter
// @namespace   FB_POLITICS_FILTER
// @description Jednoduchý script pro české prezidentské volby 2013
// @include     *.facebook.com/*
// @version     0.2
// @grant       GM_getValue
// @grant	GM_setValue
// @grant	GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @author 	Pooky - based on FB feed filter (Smalltalk80)
// ==/UserScript==



var patterns = {
		//"ENABLED" : "",
		"Zemana" : /(\bZeman)|(\bMiloš)/,
		"Schwarzenberga" : /(\bSchwar)|(\bKar)|(\bKníže)/,  
		"Klause" : /\bKlaus\b/
	};

function isNewsFeedPage() {
	
	return $("#sideNav li:first").hasClass("selectedItem");
}

function addControl() {
	
	//if ($("#feedFilter").size() == 0) {
		$("#pagelet_welcome_box").after('<div id="feedFilter"><h4 class="navHeader">UŽ NECHCI POSLOUCHAT: </h4></div>');
		var i = 0;
		for (var key in patterns) {
			++ i;
			var val = GM_getValue("fbFilter_" + key, "off");
			$("#feedFilter").append('<div class="feedFilter_option"><input id="feedFilter_' + i + '" type="checkbox"' + (val == 'on' ? ' checked="checked"' : '') + '/>' + key + '</div>');
			(function() {
				var key_ = key;
				$("#feedFilter_" + i).click(function() {
					var val_ = $(this).attr("checked") ? "on" : "off";
					GM_setValue("fbFilter_" + key_, val_);
					showHideFeeds();
				});
			})();
		}
	//}
}

function showHideFeeds() {
	if (isNewsFeedPage()) {
		

		/*if (GM_getValue("fbFilter_ENABLED") != "on") {
			$(".uiStreamStory").show();
			console.log("off");
			return;
		}*/

		$(".userContent").each(function() {
			var str = $(this).html();
			//console.log(str);
			for (var key in patterns) {
				
				if (patterns[key] == "") {
					continue;
				}
				if (patterns[key].test(str) && !$(this).hasClass("fbfilter_mod")) {
					var val = GM_getValue("fbFilter_" + key, "off");
					/*if (val == "on") {
						$(this).parents(".uiStreamStory").hide();
					}
					else {
						$(this).parents(".uiStreamStory").show();
					}*/
					$(this).addClass("fbfilter_mod");
					$(this).parents("div[role=article]").find(".UFICommentBody").addClass("fbfilter_mod");
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
	addControl();
	GM_addStyle(".fbfilter_mod { color: silver; text-decoration: line-through; font-style: italic; }");
	GM_addStyle("#feedFilter{ z-index: 100; padding-top: 10px; } .feedFilter_option{display: block; padding-left: 15px; padding-top: 4px; text-indent: -15px; height: 20px;}");
	repeat();
});
