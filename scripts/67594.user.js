// ==UserScript==
// @name           Reddit: Toggle Side Bar and Footer
// @author         OriginalSyn - modified by theplaceboeffect
// @namespace      http://greasemonkey.theplaceboeffect.com
// @description	   Hides the Reddit side bar and adds a toggle link in the user control panel area on the header. Modified to also hide the Footer from http://userscripts.org/scripts/show/66935.
// @include        http://www.reddit.com/*
// ==/UserScript==

// Check if jQuery's loaded
    function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { 
			window.setTimeout(GM_wait,100); 
		}else{ 
			letsJQuery(); 
		}
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		unsafeWindow.jQuery('.side').hide();
		unsafeWindow.jQuery('.footer-parent').hide();
		unsafeWindow.jQuery("#header-bottom-right").append(" | <a href='#' id='toggleSideBar'>SF Toggle</a>");
		
		unsafeWindow.jQuery("#toggleSideBar").click(function(){
			unsafeWindow.jQuery(".side").slideToggle();
			unsafeWindow.jQuery(".footer-parent").slideToggle();
		});
    }
