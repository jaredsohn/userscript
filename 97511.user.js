// ==UserScript==
// @name My_VK
// @include http://vk.com/*
// @description Some tweaks for vk.com
// ==/UserScript==

var $;

// Add jQuery
(function()
{
if (typeof unsafeWindow.jQuery == 'undefined') 
{
	var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
	GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	GM_JQ.async = true;
	GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}
GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() 
{
if (typeof unsafeWindow.jQuery == 'undefined')
	{
	window.setTimeout(GM_wait, 100);
} else {
	$ = unsafeWindow.jQuery.noConflict(true);
	letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery()
{
var TopDivs = ['top_links','topNav']
for (var i = 0; i < TopDivs.length; i++) 
{	
	$('#'+TopDivs[i]).append('<a href="/newsfeed.php"class="topNavLink fl_l top_nav_link">новости друзей</a>');
	$('#'+TopDivs[i]).append('<a href="/newsfeed.php?section=comments"class="topNavLink fl_l top_nav_link">комментарии</a>');
	$('#'+TopDivs[i]).append('<a href="/newsfeed.php?section=groups"class="topNavLink fl_l top_nav_link">новости групп</a>');
}
}