// ==UserScript==
// @name           Make Amazon Advantage User Friendly
// @namespace      http://www.wjgilmore.com/code/
// @description    Change Amazon Advantage Item Management Form Field Sizes
// @include        https://advantage.amazon.com/
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
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
		$('#generated_description').attr('cols', 100);
		$('#generated_description').attr('rows', 75);
		
		$('#generated_author_bio').attr('cols', 100);
		$('#generated_author_bio').attr('rows', 50);		
		
    }