// ==UserScript==
// @name           Facebook Ticker Timer
// @namespace      themightydeity
// @description    Shows the Timestamp on facebook "Ticker"
// @version        1.1
// @include        https://www.facebook.com/
// @include        http://www.facebook.com/
// @match	   http://www.facebook.com/
// @match	   https://www.facebook.com/
// @icon           http://www.accident-assistance.uk.com/pic/facebook-icon.png
// ==/UserScript==




function GM_facebookFeedTimer(){
	if(/Opera|Chrome|Chromium/.test(navigator.userAgent)) {
		unsafeWindow = window;
		if(/Chrome|Chromium/.test(navigator.userAgent)){
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			unsafeWindow = div.onclick();
		}
	}
	var s= unsafeWindow.document.createElement('script');
	s.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';
	s.addEventListener("load", function(){
		GM_jQuery = unsafeWindow.jQuery.noConflict();
		unsafeWindow.GM_jQuery = GM_jQuery;
		GM_jQuery('body').append("<button onmouseover='this.style.opacity=1;' onmouseout='this.style.opacity=0;' id='GM_TimeButton' class='uiButton uiButtonOverlay uiButtonNoText' style='position:fixed;top:0;left:0;font-size:12px;padding:5px;opacity:0;z-index:999' onclick=\"GM_jQuery('div.tickerActivityStories > div.fbFeedTickerStory').each(function(){if(!(GM_jQuery(this).hasClass('timeAdded'))){feedTime=new Date(GM_jQuery(this).attr('data-ticker-timestamp')*1000);feedTime=feedTime.toLocaleString();GM_jQuery(this).append('<br /><span style=\\'padding-left:4px;font-size:9px;color:#999;\\'>'+feedTime+'</span>');GM_jQuery(this).addClass('timeAdded');}});\">Show Time</button>");
	},false);
	if(typeof unsafeWindow.jQuery!='undefined') {
	}
	else{
	  unsafeWindow.document.getElementsByTagName('head')[0].appendChild(s);
	}
};

window.addEventListener ("load", GM_facebookFeedTimer(), false);