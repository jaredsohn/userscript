// ==UserScript==
// @name           ForeverDoomed Fixed Width
// @namespace      http://foreverdoomed.com/forums/*
// @include        http://foreverdoomed.com/forums/*
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
        var body = $('body');
		wrapper = $('<div>');
		wrapper.append(body.children());
		body.children().remove();
		body.append(wrapper);
		
		wrapper.css({
			'max-width' : '1024px',
			'margin' : '0 auto 0 auto'
		});
		
    }