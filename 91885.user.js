// ==UserScript==
// @name           GMail Chat Position
// @namespace      http://goo.gl/NBGv3
// @description    Add an option to set the gmail chat position.
// @include        https://mail.google.com/mail/*
// @require        https://ajax.googleapis.com/ajax/libs/dojo/1.5/dojo/dojo.xd.js
// ==/UserScript==

var dojo;

// Add dojo
(function(){
	if (typeof unsafeWindow.dojo == 'undefined') {
	    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
	        GM_JQ = document.createElement('script');
	
	    GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/dojo/1.5/dojo/dojo.xd.js';
	    GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if dojo's loaded
function GM_wait() {
    if (typeof unsafeWindow.dojo == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
    	dojo = unsafeWindow.dojo;
		
		dojo.destroy('capital');
		dojo.style("application", "margin", "0");
		
		var hw = dojo.style("header", "width");
		var sw	= dojo.style("sidebar", "width");
		var wdt = (hw - sw);			
		
		dojo.style("page_wrapper", "width", wdt + "px");
		dojo.style("theme_home", "width", wdt + "px");
    }
}