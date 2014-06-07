// ==UserScript==
// @name           BigResource Result Remover (Google)
// @namespace      b3a5c91e-75b5-4eda-8c0d-4652a92bb8ab
// @description    Removes BigResource results from Google searches.
// @include        http://www.google.com/*
// @include        http://*.google.com/*
// ==/UserScript==

// jQuery - Greasemonkey setup from: http://joanpiedra.com/jquery/greasemonkey/


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
        // Fetch all google results
        var results = $("li[class=g]");
        // Iterate through each result
        results.each(function(i){
        	// Get the link from the result
        	var result = $(this).find("cite").text();
        	// Check for "bigresource"
	// Create regex
	re = /^(www|\w+?|https:\W\W)\.?bigresource/i;
                  if (re.test(result))
                  {
	       $(this).html("<cite><em>Removed 'bigresource' related result: </em>" + result + "</cite>");
	}
        });
    }