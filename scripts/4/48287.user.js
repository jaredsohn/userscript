// ==UserScript==
// @name          FriendFeed Service Icons
// @namespace     http://userscripts.org
// @description	  Inserts service icons back into the FriendFeed timeline (where they belong!)
// @author        Paul Reynolds
// @homepage      http://userscripts.org/scripts/show/48287
// @include       http://friendfeed.com/*
// @include       https://friendfeed.com/*
// @include       http://*.friendfeed.com/*
// @include       https://*.friendfeed.com/*
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var GM_CSS = document.createElement('style');
GM_CSS.type = 'text/css';
GM_CSS.innerHTML = "a.hackIcon {padding-left: 20px; }"; 
document.getElementsByTagName('head')[0].appendChild(GM_CSS);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; mainRun(); }
}
GM_wait();

// All your GM code must be inside this function
function mainRun() {	
	$("div.info").each(function(i) {
		if ($(this).find("a.service").length == 0)
		{
			$(this).addClass("hackIcon");
			$(this).css("padding-left", "20px");
		    $(this).css("background", "url(\"/static/images/icons/internal.png\") no-repeat left center");
		}
		else
		{
			var link = $(this).find("a.service:first");
			var svc = link.html();
			var icon = svc.toLowerCase();
			icon = icon.split(' ').join('');
			//link.addClass("hackIcon");
			//link.css("background", "url(\"/static/images/icons/"+icon+".png\") no-repeat left center"); 
			$(this).addClass("hackIcon");
			$(this).css("padding-left", "20px");
		    $(this).css("background", "url(\"/static/images/icons/"+icon+".png?v=77ee\") no-repeat left center");

			// TODO: add special case for when service name lower case, no spaces doesn't work
		    if (svc.indexOf("Google Reader") >= 0) {  }
		}
	});
	
	
}