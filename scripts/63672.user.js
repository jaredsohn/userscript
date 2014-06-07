// ==UserScript==
// @name           Make em bigger
// @namespace      http://wanderingdigital.com
// @include        http://instructables.com
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery is loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All GM code must be inside this function
    function letsJQuery() {
    	function popper (im) {
	        var vc = im.attr("src");
	        if (vc.indexOf('THUMB')>-1) {
	        	var vc2 = vc.replace("THUMB", "MEDIUM");
	        	if ($("#gm_remrem")) { $("gm_remrem").remove(); }
	        	$("body").prepend("<img style='z-index:10000; border:10px solid #000; position:fixed; top:10px; right:10px' id='gm_remrem' src='"+vc2+"' />");
	        }
    	}
    	
    	function depopper () {
    		$("#gm_remrem").remove();
    	}
    	
        $("img").mouseover(function () { popper ($(this)); });
        $("img").mouseout(function () { 
        	$("#gm_remrem").fadeOut("Slow");
        });	
    }