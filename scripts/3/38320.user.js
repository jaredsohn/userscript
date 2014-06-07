// ==UserScript==
// @name          OneRiot in your Google
// @namespace     http://almaer.com/firefox/userscripts/
// @description   Add a riot to your Google
// @include       http://*google.com/search*
// ==/UserScript==

(function() {
	// Add jQuery
	var $;
	var query = parseQuery();
	var oneriotURL = 'http://www.oneriot.com/search?q=' + query;

	var script = document.createElement('script');
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);

	// Check if jQuery's loaded
	function jQueryCheck() {
		if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jQueryCheck, 100); }
		else { $ = unsafeWindow.jQuery; jQueryReady(); }
	}
	jQueryCheck();

	// The Real Work
	function jQueryReady() {
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: oneriotURL,
		    onload: function(response) { // Get the first result from OneRiot
				var resulttitle = response.responseText.match(/(\<a class="result_title".*?\<\/a\>)/)[0];
				if (resulttitle) {
					var title = $(resulttitle);
					var url = title.attr('href');
					var text = title[0].textContent;
					var result = '<div id="oneriot" style="padding: 2px;"><a href="http://oneriot.com/" title="Visit oneriot.com"><img src="http://almaer.com/dion/images/oneriot_logo.png" border="0" style="margin-right: 4px;"/></a> <a href="' + url + '" title="View the OneRiot result">' + text + '</a> <a href="' + oneriotURL + '" style="color: #3399FF; padding: 0 8px;" title="See more results for this query on the oneriot.com website">more oneriot results</a></div>';
					$('#ssb').after(result); // Add it to the Google DOM at the top
				}
		    }
		});
	}

	// Get the Google query from the query string
	function parseQuery() {
		var result = window.location.search.match(/\&q=(.*?)\&/);
		if (result && result.length > 0) {
			return result[1];
		}
	}

})();