// ==UserScript==
// @name           Image fix for gearheads.in
// @namespace      http://gearheads.in
// @include        http://gearheads.in/*
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

    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            doJQuery();
        }
    }

    function doJQuery() {
        
		var imgLi = $('#cat221');
		if(imgLi) {
			var trElement = imgLi.find('ol li div div table tbody tr td:nth-child(5)');
			trElement.remove();
		}

    }

