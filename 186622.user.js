// ==UserScript==
// @name          Newegg Camel Graph
// @version       1.0.0
// @description    Add Camelegg graph + link to Newegg product pages.
// @namespace      null
// @updateURL     https://userscripts.org/scripts/source/186622.meta.js
// @include        http://www.newegg.*/*
// @include        http://*.camelegg.com/*
// @include        http://camelegg.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


var width = 300;
var height = 250;
var chart = "newegg"; 


var arr = document.domain.split(".");
var country = arr[arr.length - 1];
if (country=="com") {country = "us";}


  var url = window.location.href;
  var pattern = "http://www.newegg.com/Product/Product.aspx([?])Item=([A-Z0-9]{0,25}).*";
  var exp = new RegExp(pattern, "gi");
  var asin = url.replace(exp,"$2");

var element = $(':input[id="hiddenItemNumber"]');
var asin2 = $.trim(element.attr("value"));
                
if (asin.length < asin2.length) {asin=asin2;}
		
var link2 = "<a  target='blank' href='http://" + country + ".camelegg.com/product/" + asin + "'><img src='http://charts.camelegg.com/" + country + "/" + asin + "/" + chart + ".png?force=1&zero=0&w=" + width + "&h=" + height + "&desired=false&legend=1&ilt=1&tp=all&fo=0' /></a>";

var camelurl = 'http://' + country + '.camelegg.com/product/' + asin;
GM_xmlhttpRequest({
    method: 'GET',
    url: camelurl,
    
    onload: function(response) {

	var parser      = new DOMParser ();
    	var responseDoc = parser.parseFromString (response.responseText, "text/html");
	

        if (!responseDoc.getElementById('chart_option_details').disabled) {
$("#BrandLiveChat").append("<div id='camelegg' style='margin-top: 2px; margin-left: -2px'>" + link2 + "</div>");

	}



    }
});

function thisCodeProduct () {
  var url = unescape(location.href);
  var pattern = "http://([a-z]{0,2}).?camelegg.com/product/([A-Z0-9]{0,25}).*";
  var exp = new RegExp(pattern, "gi");
  return url.replace(exp,"$2");
}

var url = unescape(location.href);
var pattern = "http://([a-z]{0,2}).?camelegg.com/.*";
var exp = new RegExp(pattern, "gi");
var code = url.replace(exp,"$1");

if (code == '')
  code = 'com';
else if (code == 'us')
  code = 'com';
else if (code == 'uk')
  code = 'co.uk';

$(document).ready(function () {
	var links = document.evaluate("//a[contains(@href, 'camelegg.com')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  	for (var i = 0; i < links.snapshotLength; i++) 
  	{ 
  	  var link = links.snapshotItem(i);
  	  if (link.title == 'View the product page at Newegg') {
  	    link.removeAttribute('onclick');
  	    link.href = 'http://www.newegg.' + code + '/Product/Product.aspx?Item=' + thisCodeProduct();
  	  }
  	} 

	
	
});

