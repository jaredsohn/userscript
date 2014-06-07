// ==UserScript==
// @name       Tumblr - Hide Sponsored Posts
// @namespace  https://www.metalmetalland.com
// @require    http://code.jquery.com/jquery-2.0.3.js
// @require    https://www.metalmetalland.com/scripts/waitForKeyElements.js
// @version    1.0
// @description  Hides sponsored posts (ads disguised as posts) in the Dashboard, Radar, Spotlight, and tags.
// @match      http://www.tumblr.com/*
// @exclude    http://www.tumblr.com/upload/*
// @exclude    http://www.tumblr.com/blog/*
// @exclude    http://www.tumblr.com/new/*
// @exclude    http://www.tumblr.com/inbox/*
// @copyright  2013+, ebol4
// ==/UserScript==
searchForSponsored();
waitForKeyElements(".post_container", searchForSponsored);
function searchForSponsored() {
    console.log("Sponsored post search...");
	if(window.location.href.toLowerCase().indexOf("spotlight") > -1) { //we're in the spotlight!
		$(".sponsored_badge ").parents(".full_card.clearfix ").remove();
	}
	else if(window.location.href.toLowerCase().indexOf("dashboard") > -1) { //we're in the dashboard!
		$(".sponsored_badge ").parents(".post_container").remove();
	}
}