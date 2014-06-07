// ==UserScript==
// @name          TargetHazardScore
// @namespace     http://www.leowu.net/
// @description   Adds hazard score for cosmetic products to Target's product description pages
// @include       http://www.target.com/*
// ==/UserScript==

/* ADDING JQUERY CAPABILITIES BORROWED FROM joanpiedra.com/jquery/greasemonkey/ */

// Add jQuery
var GM_JQ = document.createElement('script');

GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
//GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
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
	getHazardScore = function (jQuery, productName) {
		GM_xmlhttpRequest({method:"GET", 
				url:'http://www.cosmeticsdatabase.com/wordsearch.php?nothanks=1&query='+productName, 
				onload:function(response) {
				scoreResult = $(response.responseText).find("table.bigtable tr:nth-child(2) td:nth-child(4)").html();

				if (scoreResult == null || scoreResult == 'N/A') {
				score = 'Not Available';
				} else {
				score = scoreResult + ' out of 10';
				}
				jQuery.after('<a target="_blank" href="http://www.cosmeticsdatabase.com/wordsearch.php?nothanks=1&query='+productName+'">'+
					"<strong>Hazard Score:</strong> " + score + "</a>");
				}
				}
				);

	}



	getHazardScore($('#productTitle'), $('#productTitle').text());

	$('body').prepend('<div style="margin: 0 auto 0 auto; '
			+ 'border-bottom: 1px solid #000000; margin-bottom: 5px; '
			+ 'font-size: small; background-color: #44CC55; '
			+ 'color: #000000;"><p style="margin: 2px 0 1px 0;"> '
			+ '<b>This site is running a script from the Firefox' 					+ ' Environmental Sustainability '
			+ 'Toolkit (FEST). Please visit '
			+ '<a href="http://lotus.calit2.uci.edu/fest/index.html">'
			+ ' our homepage</a>'
			+ ' for more information on FEST.</b>'
			+ '</p></div>');

}


