// ==UserScript==
// @name        Guardian Ignore Users
// @namespace   http://tempuri.og
// @description Ignore Users
// @include     http://*.guardian.co.uk/*
// @include     http://*.guardiannews.com/*
// @include     http://*.theguardian.com/*
// @grant none
// @version     5
// ==/UserScript==

var ignoreList = ['user1','user2'];
var regexIgnoreList = [];

var jQuery = unsafeWindow.jQuery;

jQuery(function() {

var commentsUl = jQuery("ul.d2-comments");

var applyIgnore = function(commentsUl) {
	var threadsHidden = postsHidden = 0;
	
	var v2profiles = jQuery("a.d2-username", commentsUl);

	// responses are in ul.d2-responses

	jQuery.each(v2profiles, function(index, obj) { 
	    var regexMatch = false;
	    
	    for(var i=0; i<regexIgnoreList.length;i++) {
	       var regex = regexIgnoreList[i];
	       if(regex.test(obj.text)) {
	           regexMatch = true;
	           break;
	       }
	    }
	    
		if(regexMatch || jQuery.inArray(obj.text, ignoreList)!=-1) {
			var isResponse = jQuery(obj).parents("ul.d2-responses").length > 0;
			
			if(isResponse) {
				jQuery(obj).parents("div.d2-comment-inner").addClass("hideScript").hide();
				postsHidden++;
			}
			else
			{
				jQuery(obj).parents("li.d2-comment").addClass("hideScript").hide();
				threadsHidden++;
			}
		}
	});
	showSummary(postsHidden, threadsHidden);
}

var showSummary = function(postsHidden, threadsHidden) {
    var formDiv = jQuery("form.d2-options>div");
	formDiv.append("<br /><span>" + threadsHidden + " threads and " + postsHidden + " posts hidden.</span>&nbsp;<a href='#' id='ignoreToggle'>Toggle posts</a>");
	jQuery("a#ignoreToggle",formDiv).click(function() {
		toggleHiding();
		return false;
	});
}

var toggleHiding = function() {
    jQuery(".hideScript", commentsUl).toggle();
}


if(commentsUl.length)
{
	jQuery(document).ajaxComplete(function(event, xhr, settings) { 
		var url = settings.url;
		if(url.indexOf("discussion") > -1) {
			applyIgnore(jQuery("ul.d2-comments"));
		}
	});

	applyIgnore(commentsUl);
}
});