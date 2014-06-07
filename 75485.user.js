// ==UserScript==
// @name           google maps latlng
// @namespace      devenv
// @description    Gets lat and lng in google maps
// @include        http://maps.google.com

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
        $(document).bind('keydown', function(evt) {
	  switch(evt.which) {
	  
	    case 192:
	      res = $('#mapmaker-link').attr('href').match(/ll=(.*?)&/)[1].split(',');
	      $('.lname').html($('.lname').html()+"&nbsp;&nbsp;"+res[0]+"&nbsp;"+res[1]);
	}
     });
    }