// ==UserScript==
// @name           gamespot HD videos
// @namespace      http://www.w3.org/1999/xhtml
// @include        http://*gamespot.com*video*
// @include        http://*gamespot.com*shows*
// @description	   If a gamespot video has HD you will see it in HD, with the power of jQuery thanks to http://joanpiedra.com/jquery/greasemonkey/
// ==/UserScript==
// Add jQuery
	var usage=0;
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
		if(usage>1) return;
        if(typeof unsafeWindow.jQuery == 'undefined') { 
			window.setTimeout(GM_wait,100); 
		}
		else { 
			$ = unsafeWindow.jQuery; 
			letsJQuery();
			usage++;			
		}
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		if($('a[href="#toggle_video"]').text().indexOf("High Def") != -1)
		 {
			
			var url = window.location.toString();
			var query_char='?';
			
			if( url.indexOf('hd=1')!=-1)
			{
				return;
			}
			
			if( url.indexOf('?')!=-1)
			{
				query_char='&';
			}
			
			if( url.indexOf('#')!=-1 )
			{
				tmp=url.split('#');
				url=tmp[0];
			}
			
			window.location.replace(url + query_char + 'hd=1');
		 }
    }