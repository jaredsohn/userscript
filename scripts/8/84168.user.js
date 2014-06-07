// ReTweet Script
// version 0.1 BETA!
// 7 Nov 2007
// Copyright (c) 2009, Ashit Vora
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ReTweet", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ReTweet
// @namespace     http://voratec.com/projects/
// @description   Add ReTweet button on your Twitter.
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,0); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
	}
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		$("#timeline > li").each(
			function(i){
				
				var screen_name = $(this).find(".screen-name").html();
				var username = $(this).find(".screen-name").attr("title");
				var tweet = $.trim($(this).find(".entry-content").html()).replace(/<a .*?>(.*?)<\/a>/g, '$1');
				var rt = "RT @"+screen_name+" "+tweet;
				var link = '<li><span class="retweet"><span class="reply-icon icon"/><a title="anjing susah bgt !!! " href="/?status='+ encodeURIComponent(rt) +'">Gratz</a></span></li>';

				$(this).find(".actions-hover").append(link);
				
				
			}
		);
    }