// ==UserScript==
// @name           Tumblr: Follow Count
// @namespace      http://lewyy.tumblr.com
// @description    Show followers instead of tumblarity
// @include		 http://www.tumblr.com/dashboard*
// @include		 http://www.tumblr.com/tagged*
// @match		 	 http://www.tumblr.com/dashboard*
// @match			 http://www.tumblr.com/tagged*
// @require		 http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
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
		var followText;  			
		followText = $("#right_column .dashboard_nav_item ul.dashboard_subpages a[href='/followers']").html();
		var r = followText.match(/[\d\.]+/g);
		var followNumber = parseFloat(r[3]) + 500;
		$("#right_column .dashboard_nav_item ul.dashboard_subpages a[href='/followers']").html('<img src="http://assets.tumblr.com/images/dashboard_controls_activity.png?alpha&amp;3" height="13" width="15">' + followNumber + ' followers')
	}