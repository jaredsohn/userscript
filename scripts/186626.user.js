// ==UserScript==
// @name          Best Buy Camel Graph
// @version       1.0.1
// @description    Add Camelbuy graph + link to Best Buy product pages.
// @namespace      null
// @updateURL     https://userscripts.org/scripts/source/186626.meta.js
// @include        http://www.bestbuy.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==


var width = 350;
var height = 250;
var chart = "sale"; 



var country = "us";

var element = $(':input[id="skuIdPDP"]');
var asin = $.trim(element.attr("value"));
                
		
var link2 = "<a  target='blank' href='http://" + country + ".camelbuy.com/product/" + asin + "'><img src='http://charts.camelbuy.com/" + country + "/" + asin + "/" + chart + ".png?force=1&zero=0&w=" + width + "&h=" + height + "&desired=false&legend=1&ilt=1&tp=all&fo=0' /></a>";

var camelurl = 'http://camelbuy.com/product/' + asin;

GM_xmlhttpRequest({
    method: 'GET',
    url: camelurl,
    
    onload: function(response) {

	var parser      = new DOMParser ();
    	var responseDoc = parser.parseFromString (response.responseText, "text/html");
	

        if (!responseDoc.getElementById('chart_option_details').disabled) {
$("#instore-availability").append("<div id='camelbuy' style='margin-top: 15px; margin-left: -2px'>" + link2 + "</div>");

	}



    }
});
