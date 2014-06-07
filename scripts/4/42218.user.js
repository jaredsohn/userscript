// ==UserScript==
// @name           Go Purple Team
// @namespace      teampurplemacheist
// @description    Makes it appear that purple team is winning.
// @include        http://www.macheist.com/*
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
    	$('div.glow').fadeOut("fast",changeHeader);
    	changeLoot();
    	$('li.sel').css({'background-position' : '-325px -3px'});
    }
    
    function changeHeader(){
    	$('div.glow').css({'background-position' : '0px -38px'});
    	$('div.glow').fadeIn("slow");
    }
    
    function changeLoot(){
    	$('div.glow').fadeIn("slow");
    	$('li.selected').css({'background-position' : '0px -139px'});
    }