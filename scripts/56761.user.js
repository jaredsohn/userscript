// ==UserScript==
// @name           safereddit
// @namespace      safereddit
// @description    block nsfw content
// @include        http://www.reddit.com/*
// ==/UserScript==


// --- STARTUP CODE
if(typeof unsafeWindow.jQuery =='undefined') {
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    function GM_wait() {
        if(unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    	else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
} else { 
	$ = unsafeWindow.jQuery
	letsJQuery();
}
// --- END STARTUP CODE


// --- ACTIVE CODE

    function letsJQuery() {
	list = new Array('nsfw','NSFW_nospam','The_nude','nsfwvideos','Amateur','jailbait','LegalTeens');
	$('.thing').each(function() {
		for (i=0; i<list.length; i++) {
			var regex = new RegExp(list[i],'ig');
			if ($(this).html().match(regex)) {
				$(this).hide();
				continue;
			}
		}
        });
    }