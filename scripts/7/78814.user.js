// ==UserScript==
// @name           Minimal FFFFOUND! 
// @namespace      http://www.anthonyjamesbruno.com
// @description    Minimalize the FFFFOUND Website
// @include        http://ffffound.com*
// ==/UserScript==

 var link = document.createElement('LINK');
  link.rel = 'stylesheet';
  link.href = 'http://dev.anthonyjamesbruno.com/greasemonkey/overwrite.css';
  link.type = 'text/css';
  document.body.insertBefore(link, null);
  
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
    
    
    var fade = '#td.vline a img, div.related_to_item img, div.more_images img, td.vline img'
    
    	$('div.button').prepend('<a class="home" onClick="history.go(-1)">&larr;</a>');
    	
    	$(fade).fadeTo(1, 0.4);
    	
    	$(fade).hover(
  			function () {
    			$(this).addClass('hover').animate({opacity: 1});
  			},
  			function () {
    			$(this).removeClass('hover').animate({opacity: 0.4});
  		});
  		
  		
    // End it all
    }