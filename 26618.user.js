// ==UserScript==
// @name           qbn last post
// @description    jumps to last post in thread
// @include        http://www.qbn.com/topics/
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait()
{
	if(typeof unsafeWindow.jQuery == 'undefined')
	{ 
		window.setTimeout(GM_wait,100);
	}
	else
	{
		$ = unsafeWindow.jQuery; letsJQuery();
	}
}

GM_wait();

function letsJQuery()
{
	if(window.location.href.indexOf("#last_reply") != -1)
	{
		$('html,body').animate({scrollTop: $("li.reply:last").offset().top}, 1000);
	}
	var b = $($(".pagination_inner")[0]).find("a:last");
	b.after('<span> | </span><a href="' + b.attr("href") + '#last_reply"><em>LAST POST</em></a>');
}