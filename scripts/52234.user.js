// ==UserScript==
// @name           Ninjavideo
// @description	   Removes all anyone ads and anything not nessary to use ninjavideo.com
// @namespace      http://ninjavideo.net/
// @include        http://ninjavideo.net/*
// @include        http://www.ninjavideo.net/*
// ==/UserScript==

// ==UserScript==
// @name           Ninjavideo
// @description	   Removes all anyone ads and anything not nessary to use ninjavideo.com
// @namespace      http://ninjavideo.net/
// @include        http://ninjavideo.net/
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
		$('#right, #head').remove();
		$('body script, body ispan, #wrap script, .videoad, .radionotifier, body span').remove();
		
		
		$('#menuList').css('width' , '810px');
		$('#wrap').css('width' , '810px').find('script').remove();
		
	 	$(window).load(function(){
			setTimeout($('ispan').remove(), 5000);
		});
    }