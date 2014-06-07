// ==UserScript==
// @name           DaniWeb Uncrappify
// @namespace      www.example.com
// @description    Removes overlay, ads, and clutter from DaniWeb.com
// @include        http://www.daniweb.com/*
// ==/UserScript==

// Add styles to kill undesirable content
GM_addStyle(".ad_mediumrectangle {display: none;}");
GM_addStyle("#abg {display: none;}");
GM_addStyle("#TB_window {display: none; border: none}");
GM_addStyle("#TB_overlay {display: none; !important}");
GM_addStyle("#TB_ajaxContent {display: none; border: none;}");
// Initialize jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
// Check if jQuery's loaded
function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
		window.setTimeout(GM_wait,100);
	else 
	{
		$ = unsafeWindow.jQuery;
		main();
	}
}
GM_wait();
function main()
{
	$(document).ready(function(){
		killOverlay();
		$(".ad_linkunit").remove();
		// Remove ad leaderboards
		$(".ad_leaderboard").remove();
		// Remove crap at bottom
		$(".yellowcontainer+br+br+div").next().andSelf().remove();
		dblCall(function(){$(".yellowcontainer+br").remove();});
		dblCall(function(){$("#pagenav_menu").prev().remove();});
		$("#pagenav_menu").prev().remove();
		// Remove inline ads
		$("div[id^=edit] div.userinfo div.bold").each(function(){
			if ($(this).text() == "Ads by Google")
				dblCall(function(){$(this).parent().next().remove();});
				$(this).parent().remove();
		});
		// Remove signatures
		dblCall(function(){$("div[id^=post_message]").next().remove();});
	});
}
function dblCall(code)
{
	code.call(); code.call();
}
var iter = 0;
function killOverlay()
{
	if ($("#TB_window").size() != 0)
		$("#TB_window").hide().remove();
	if ($("#TB_overlay").size() != 0)
		$("#TB_overlay").hide().remove();
	if ($("#TB_ajaxContent").size() != 0)
		$("#TB_ajaxContent").hide().remove();
	if (iter < 25)
	{
		iter++;
		window.setTimeout("killOverlay", 10);
	}
}