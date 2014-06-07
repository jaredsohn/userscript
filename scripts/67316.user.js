// ==UserScript==
// @name          SmartTube
// @namespace     http://voiceoflogic.co.il/Pages/SmartTube
// @description	  Adds "Add to QuickList" button in users profile page.
// @author        Eran Hertz
// @homepage      http://voiceoflogic.co.il
// @include       http://*.youtube.com/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {}
	
	else { $ = unsafeWindow.jQuery; 
		if (typeof unsafeWindow.jQuery == "undefined")
			return;
		unsafeWindow.jQuery(".scrollbox-page:visible").each(function() {
			if (  (unsafeWindow.jQuery(this).attr("isQuickListFixed") != "1") && unsafeWindow.jQuery.trim( unsafeWindow.jQuery(this).html()) != ""  )
			{
				unsafeWindow.jQuery(this).attr("isQuickListFixed","1");
				QuickListFixed("#" + unsafeWindow.jQuery(this).attr("id"));
			 }
		});
	}
	window.setTimeout(GM_wait,1000);
}
GM_wait();

function QuickListFixed(scope)
{ 
		GM_log("SmartTube - QuickListFixed: scope " + scope);
		unsafeWindow.jQuery(scope + " .playnav-video").each(function () {
	    var videoId = unsafeWindow.jQuery(this).find(".encryptedVideoId").text()
	    if (videoId == "")
	        return;
	    var imgSrc = unsafeWindow.jQuery(this).find("a[class*='video-thumb'] > img").attr("src");
	    var imgTitle = unsafeWindow.jQuery(this).find("a[class*='video-thumb'] > img").attr("title");
	    var button = unsafeWindow.jQuery("<button></button>")
	            .attr("title","Add Video to QuickList")
	            .attr("class","addtoQL90 master-sprite QLIconImg")
	            .attr("id","add-to-quicklist-" + videoId)
	            .attr("ql", videoId)
	            .attr("onclick","yt.www.watch.quicklist.clickedAddIcon(this, this.getAttribute('ql'), 0, '"+ videoId +"', '"+ imgTitle.replace(/\x27/gi,'&#39;') +"');var e=arguments[0]||window.event;e.stopPropagation();e.cancelBubble = true;return false;" );

	        var span = unsafeWindow.jQuery("<span></span>")
	            .css("display","none")
	            .attr("class","quicklist-inlist")
	            .html("Added to <br/> Quicklist");
	   
	    unsafeWindow.jQuery(this).find("a[class*='video-thumb']").find("button").remove();
	    unsafeWindow.jQuery(this).find("a[class*='video-thumb']").find("span").remove();
	    unsafeWindow.jQuery(this).find("a[class*='video-thumb'] > img").after(button).after(span);
	});
	
}


