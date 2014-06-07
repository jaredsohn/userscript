// ==UserScript==
// @name           4Chan Toolkit
// @namespace      Anon
// @description    Auto-noko and show post numbers by default.
// @include        http://boards.4chan.org/*
// ==/UserScript==

// You're welcome.

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
        if($){
			$("input, textarea").each(function(){
				switch($(this).attr("name")){
					case "name":
						$(this).attr("value", "");
					break;
					case "email":
						$(this).attr("value", "noko");
					break;
					case "upfile":
						$(this).attr("value", "");
					break;
					case "com":
						$(this).attr("value", "");
					break;
				}
			});
			
			$("a").each(function(){
				if((""+$(this).attr('href')).indexOf("javascript")>=0){
					var linkHREF = ""+$(this).attr('href');
					linkHREF = linkHREF.replace("javascript:quote('", "").replace("')", "");
					$(this).before(" ").html(linkHREF);
				}
				if((""+$(this).attr('href')).indexOf("#q")>=0){
					var linkHREF = ""+$(this).attr('href');
					linkHREF = linkHREF.replace(/(.+)\#q/, "");
					$(this).before(" ").html(linkHREF);
				}
			});
		}
    }