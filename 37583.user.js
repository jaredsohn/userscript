// ==UserScript==
// @name           Lifehacker Sliding Comments
// @namespace      Google.com
// @include        http://lifehacker.com/
// ==/UserScript==

/*
 * If you want some added clean up on the page uncomment the next line,
 * or put that CSS into styler so the effect is not delayed!
 * you can find the stylish script at http://userstyles.org/styles/12384
 */
//var added_css = "iframe, .excerpt > br, .quicklink, #interruptor, .sponsored, #footer, #permalink_highlitedAd, #interruptor, .permalink_page_navigation, #sharetools, #sidebar, .meta-right, .metadata, #header_container, #left-side,  em, i, #errorbar {display: none !important;opacity: 0 !important; height: 0px !important; width: 0px !important;}#menubar {margin-top: 20px !important;}#content_container {margin-left: 65px !important; background: url(http://cache.lifehacker.com/assets/g4.lifehacker.com/img/background_tile.jpg) !important; background-repeat: repeat-y !important;}#logo-area {background: transparent url(http://cache.lifehacker.com/assets/g4.lifehacker.com/img/menubar-bg.png) no-repeat scroll left top !important;}.excerpt, .entry {width: 810px !important;}#search, #moreTopStories {left: 650px !important;width: 150px !important;}#comment_header {width: 100% !important;}#comment_header {background: transparent !important;}#upper_ask_ads {opacity: 0 !important;height: 10px !important;}img[class='center'] {float: left !important; margin: 2px 10px 0.75em 0 !important; padding: 5px !important; clear: left !important;}h2, a {border-bottom: 1px #F8FAF0 !important;}";if (!document.getElementsByTagName('head')[0]) { return; } else {var style;style = document.createElement('style');style.type = 'text/css';style.innerHTML = added_css;document.getElementsByTagName('head')[0].appendChild(style);}

function letsJQuery() {
	document.getElementById("CommentListWrapper").innerHTML = "<br /><br /><a id='show-comments' onclick=\"jQuery('#hidden-comments').slideToggle('slow');\">Show Comments</a><br /><br /><div id='hidden-comments'>" + document.getElementById("CommentListWrapper").innerHTML + "</div>";
	//document.getElementById('main').appendChild(comments);
	jQuery('#hidden-comments').toggle();
}
var GM_JQ = document.createElement('script');
GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js";
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(GM_wait,100);
	}else {
		jQuery = unsafeWindow.jQuery;
		jQuery.noConflict();
		letsJQuery();
	}
}
GM_wait();