// ==UserScript==
// @name           Reddit reply preview
// @namespace      http://greasemonkey.jaredmcateer.com
// @description    Creates a link that lets you see replies in the inbox
// @include        http://*.reddit.com/message/inbox/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
 function GM_wait() {
	  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
 }
 GM_wait();


// All your GM code must be inside this function
function letsJQuery() {
//make sure there is no conflict between jQuery and other libraries
//$.noConflict()
//notify that jQuery is running...
$(".replyPreviewLink, .replyPreviewFrame").remove();
$(".bylink").each(function(){
	var h="400px",		//iframe height
		 w="100%",		//iframe width
		 ctxLink = $("<span class='replyPreviewLink'> [<a href='#'>+</a>]</a>");
	ctxLink.toggle(
		function(){
			var href = $(this).prev().attr("href"),
				that = this,
				frame = $("<div style='margin:0.5em 0' class='replyPreviewFrame'><iframe src='"+href+"'></iframe><div>");
			
			frame.css({
				"display" : "none"
			});
			$("iframe", frame).css({
				"height" : h,
				"width" : w
			});
			$(this).parent().parent().parent().append(frame);
			frame.slideDown(function(){
				$("a",that).text("-");
			});
			
		},
		function(){
			var frame = $(this).parent().parent().parent().children("div.replyPreviewFrame"),
				that = this;
			frame.slideUp(function(){
				frame.remove();
				$("a",that).text("+");
			});
			
			
		}
	);
	$(this).parent().append(ctxLink);
});
}
