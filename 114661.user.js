// ==UserScript==
// @name           gigposters
// @namespace      gigposters
// @description    Redirect thumbs to full images
// @include        http://gigposters.com/*
// @include        http://www.gigposters.com/*
// ==/UserScript==


var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js';
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
        //alert($); // check if the dollar (jquery) function works
        
        $('img').each(function(){
       		var t= $(this).attr("src");
       		if ((t.match("^/posters/TN_")=="/posters/TN_")){
       		
       		$(this).attr("src",$(this).attr("src").toLowerCase().replace(/TN_/i,"") );
       		
					 }
					
				});
        
    }