// ==UserScript==
// @name           twitter_older_newer_page
// @namespace      http://twitter.com/fireshort/greasemonkey
// @description    brings back twitter older/newer page link
// @include        https://twitter.com/*
// @include        http://explore.twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.0/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { jQuery = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	var currPage=jQuery("meta[name='page']").attr('content'); 
	var newerPage="<a id='newerPage' class='round' rel='next' href='http://twitter.com/home?page="+(parseInt(currPage)-1)+"'>newer</a>&nbsp;&nbsp;&nbsp;";
	var olderPage="<a id='olderPage' class='round' href='http://twitter.com/home?page="+(parseInt(currPage)+1)+"'>older</a>&nbsp;&nbsp;&nbsp;";
	if(jQuery("#more").is("a"))
	{
		jQuery("#more").after(olderPage);
		jQuery("#logo").after(olderPage);
		if(currPage>1)
		{
			jQuery("#more").after(newerPage);
			jQuery("#logo").after(newerPage);
		}
		jQuery("#more").hide();	
	}
}