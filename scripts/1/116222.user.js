// ==UserScript==
// @name           Facebook Recent Activity Timer
// @namespace      themightydeity
// @description    Shows the Time on "Recent Activity" of any profile in facebook.
// @version        1.1
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @match	   http://www.facebook.com/*
// @match	   https://www.facebook.com/*
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
		GM_jQuery('body').append("<button onmouseover='this.style.opacity=1;' onmouseout='this.style.opacity=0;' id='GM_TimeButton' class='uiButton uiButtonOverlay uiButtonNoText' style='position:fixed;top:0;left:0;font-size:12px;padding:5px;opacity:0;z-index:999' onclick=\"GM_jQuery('ul#profile_minifeed ul.uiList li.uiUnifiedStory').each(function(){if((GM_jQuery(this).find('span.passiveName').length>=1||GM_jQuery(this).find('a.pronoun-link').html()=='Wall'||GM_jQuery(this).find('a.pronoun-link').html()=='wall'||GM_jQuery(this).find('a.pronoun-link').html()=='status'||GM_jQuery(this).find('a.pronoun-link').html()=='photo'||GM_jQuery(this).find('a.pronoun-link').html()=='link')&&(GM_jQuery(this).children('span#GM_feedTime').length<1)){eval('findTime = '+GM_jQuery(this).attr('data-ft')+'');feedTime=new Date(findTime.pub_time*1000);feedTime=feedTime.toLocaleString();GM_jQuery(this).append('<span id=\\'GM_feedTime\\'><span class=\\'uiStreamSource\\'><abbr title=\\''+feedTime+'\\'>'+feedTime+'</abbr></span></span>')}});GM_jQuery('li.recentActivityContainer ul.uiStream li div.wrap a.uiCloseButton').each(function(){mainURL=GM_jQuery(this).attr('ajaxify');console.log(mainURL);vars={};parts=mainURL.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value});if(vars['story_row_time']){mainTime=vars['story_row_time'];feedTime=new Date(mainTime*1000);feedTime=feedTime.toLocaleString();GM_jQuery(this).parent().parent().parent().append('<a class=uiLinkSubtle><abbr>'+feedTime+'</a></abbr>')}});\">Show Time</button>");
	},false);
	if(typeof unsafeWindow.jQuery!='undefined') {
	}
	else{
	  unsafeWindow.document.getElementsByTagName('head')[0].appendChild(s);
	}
};

window.addEventListener ("load", GM_facebookFeedTimer(), false);