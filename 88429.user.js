// ==UserScript==
// @name           BigT own3d.tv Expand Chat
// @description    Expand the chat box on BigT's own3d.tv live stream
// @version        1.0.1
// @date           2010-10-19
// @author         Justin Anderson
// @namespace      http://userscripts.org/users/86439
// @include        http://www.own3d.tv/live/199
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait(){
  if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery(){
  $(document).ready(function(){
		siteWidth = $("#GLOBAL-content-container").css("width");
		watchLinks = $("#watch-content div:first");
		watchStreams = $("div.VIDEOS-grid-list");
		$("#videos_related").parent().css("width", siteWidth);
		$("#videos_related").css("width", siteWidth);
		$("#videos_related div:first").css("width", siteWidth);
		$("#webchat").css({"width":siteWidth, "max-width":siteWidth});
		$("#chat_iframe").css({"width":siteWidth, "max-width":siteWidth});
		$("#webchat").after(watchLinks);
  });
}
