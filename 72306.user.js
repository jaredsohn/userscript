// ==UserScript==
// @name           Destination Jump!
// @namespace      javascript
// @description    Jump to the most useful result on a page! Skipping ads, unnecessary clicks and other annoyancies.
// @include        http://*.linkbucks.com*
// @include        http://linkbucks.com*
// @include        http://*.hotlinkimage.com*
// @include        http://hotlinkimage.com*
// @include        http://*.rapidshare.com*
// @include        http://rapidshare.com*
// ==/UserScript==

// Jump!
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
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

		// vars
		var url = window.location.host;
		// hotlinkimage image only
		if( /^(.*\.)?hotlinkimage\./.test(url) ){
			window.location = $('#img').attr('src');
		}
		// skip linkbucks link
		if( /^(.*\.)?linkbucks\./.test(url) ){
			window.location=$('#linkSkip').attr('href');		
		}
		// instant activation of 'free user' mode
		if( /^(.*\.)?rapidshare\./.test(window.location.host) )
		{
			$('form input[value="Free user"]').click();
		};
	
    } // close jQuery