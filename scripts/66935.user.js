// ==UserScript==
// @name           Reddit: Toggle Side Bar
// @author         OriginalSyn
// @namespace      http://greasemonkey.jaredmcateer.com
// @description	   Hides the Reddit side bar and adds a toggle link in the user control panel area on the header.
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
		unsafeWindow.jQuery("#header-bottom-right").append(" | <a href='#' id='toggleSideBar'>Toggle Sidebar</a>");
		unsafeWindow.jQuery("#toggleSideBar").click(function(){
			unsafeWindow.jQuery(".side").slideToggle();
		});
    }
