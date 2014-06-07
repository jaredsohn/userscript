// ==UserScript==
// @name           Insecure Password Detector
// @namespace      http://eric.themoritzfamily.com
// @description    This script adds a little banner to any site with a password field and not on https so that you can use you're 'insecure password' on that site. Good for insecure networks like open Wifi
// @include        *
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

	$.noConflict();
	$.notify = function(message) {
		$("<div>")
			.html(message)
			.css({
			position: "absolute",
			left: "0px",
			top:  "0px",
			backgroundColor : "Yellow",
 			width: "100%",
			padding: "5px",
			textAlign: "center",
			zIndex: 100,
			cursor: "pointer"
			})
			.hide()
			.appendTo("body")
			.fadeIn("slow")
			.animate({opacity: 1.0}, 300)
			.animate({opacity: 0.5}, 300).click(function() { 
				$(this).remove();
			});
	}
        // Check to see if we're secure
	if(window.location.protocol == 'https:') { return; /* We're safe */ }

	// Check for a 
	if($("input[type='password']").size() > 0) {
	  $.notify("This site is insecure, be careful with your passwords.");		
	}
	
    }

