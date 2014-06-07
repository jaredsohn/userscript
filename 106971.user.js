// ==UserScript==
// @name          FB Sidebar - Toggle Sidebar & Ticker
// @namespace     http://fpvz.square7.ch
// @description	  Adds two Buttons: One to Slide the Sidebar in & out, One to fade The new Ticker in and out
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @include       http://facebook.com/*
// @exclude		  http://www.facebook.com/plugins/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
$(function(){

$('body').prepend("<div class='removeSidebar' style='padding-top:12px; text-align:center; color: #fff;border: 1px solid #1D4088;width:41px;height:27px;background:#627AAD;position:fixed;z-index:999;top:42px;right:207px;'>>></div><div class='removeTicker' style='padding-top:12px; text-align:center; color: #fff;border: 1px solid #1D4088;width:41px;height:27px;background:#627AAD;position:fixed;z-index:999;top:84px;right:207px;'>ON</div>");

$('.removeTicker').toggle(function(){
	$('#pagelet_ticker').fadeOut("fast",function(){$('.removeTicker').text("OFF")});
	$('.fbChatSidebarBody').css("height","96%");
$('.fbChatOrderedList').css("height","96%");
	$('.fbChatSidebarFooter').css("border-bottom","1px solid #C9D0DA");
},function(){
	$('.fbChatSidebarFooter').css("border-bottom","0");
	$('#pagelet_ticker').fadeIn("fast",function(){$('.removeTicker').text("ON")});
});

$('.removeSidebar').hover(function(){
	$(this).css({background:"#6D86B7",cursor:"pointer"});
},function(){
	$(this).css({background:"#627AAD"});
});

$('.removeTicker').hover(function(){
	$(this).css({background:"#6D86B7",cursor:"pointer"});
},function(){
	$(this).css({background:"#627AAD"});
});


$('.removeSidebar').toggle(function(){
	var sidebarwidth = $(".fbChatSidebar").width();	
	$('.fbChatSidebar').animate({"right":-sidebarwidth});
	$('.fbDockWrapper').animate({"margin-right":-sidebarwidth});
	$(this).animate({"right":"2"},function(){$(this).text("<<");});
	$('.removeTicker').animate({"right":"2"});
},function(){
	var sidebarwidth = $(".fbChatSidebar").width();	
	$('.fbChatSidebar').animate({"right":"0"});
	$('.fbDockWrapper').animate({"margin-right":"0"});
	$(this).animate({"right":sidebarwidth + 2},function(){$(this).text(">>")});
	$('.removeTicker').animate({"right":sidebarwidth + 2});
});
});
}