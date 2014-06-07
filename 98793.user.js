//
// Extension of "Facebook feed filter" by Smalltalk80, available at http://userscripts.org/scripts/review/70439
//
// ==UserScript==
// @name           Facebook Home Feed Filter
// @description    Filters Facebook feed items based on regex.
// @namespace      CRD
// @include        *.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
// Updated 9/9/2012 to support latest fb version

var patterns = {
		"ENABLED" : "",
		"fb apps" : "",
		"are now friends" : /\bare now friends\b/,
		"is now friends with" : /\bis now friends with\b/,
		"commented on" : /\bcommented on\b/,
		"like" : /\blike\b/,
		"likes" : /\blikes\b/,
		"copy this to your status" : /\bcopy this to your status\b/,
		"sibling war" : /\bsibling war\b/,
		"church" : /\bchurch\b/,
		"pray for" : /\bpray for\b/,
		"da heck" : /\bda heck\b/,
		"ta heck" : /\bta heck\b/,
		"my sister is the best" : /\bmy sister is the best\b/,
		"teacher's salary" : /\bteacher'?s salary?\b/,
		"can't sleep" : /\bcan'?t sleep\b/,
		"stay at home mom's annual salary" : /\bMom's Annual Salary\b/
	};

function isNewsFeedPage() {
	return $(document.body).hasClass("home");
}

/* Modified by krog 3/11/2011 to support expand/hide */
function addControl() {
	var feedFilter = $("#feedFilter");
	
	if (feedFilter.size() == 0) {
		$("#rightCol").prepend('<div id="feedFilter" style="padding-bottom: 16px;"><h3>Filter feed: (<a 

href="javascript:void(0);" id="toggleFilters">expand</a>)</h3><div id="feedFilters" 

style="display:none;"></div></div>');
		
		var feedFilters = $("#feedFilters");
		
		$("#toggleFilters").click(function(a) {

			var element = feedFilters[0];
			
			if(element.style.display == 'none')
			{
				element.style.display = 'block';
				$(this).text('hide');
			}
			else if(element.style.display == 'block')
			{
				element.style.display = 'none';
				$(this).text('expand');
			}
			
			return false;
		});
		
		var i = 0;
		for (var key in patterns) {
			++ i;
			var val = GM_getValue("fbFilter_" + key, "off");
			feedFilters.append('<div><input id="feedFilter_' + i + '" name="feedFilter_' + i + '" 

type="checkbox"' + (val == 'on' ? ' checked="checked"' : '') + '/><label style="font-weight:normal" for="feedFilter_' + 

i + '">' + key + '</label></div>');
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
 /*
		if (GM_getValue("fbFilter_ENABLED") != "on") {
			$(".uiStreamStory").show();
			return;
		}*/


		$(".userContent").each(function() {
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

		var val = GM_getValue("fbFilter_APPS", "off");
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
	setTimeout(repeat, 1000);
}

$(document).ready(function() {
	repeat();
});
