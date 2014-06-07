// ==UserScript==
// @name           sina-t ctrl enter 
// @namespace      http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @include        http://t.sina.com.cn/*

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
	
	
	$(document).ready(function() {
	
	$("#publish_editor").keydown(function(event) {
	 if(event.ctrlKey === true && event.keyCode === 13) {
	
	 
	
	 
	 var a = document.createEvent('MouseEvents');
	 a.initEvent('click', true, true);        
	 document.getElementById("publisher_submit").dispatchEvent(a);   
	
	  
	}
	
	 });
	
    });
    }