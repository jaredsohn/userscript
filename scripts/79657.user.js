// ==UserScript==
// @name           amazon_dp
// @description    Amazon Details Page 
// @namespace      smalltalk80.uiuc
// @include        http://*.amazon.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(document).ready(function() {
		var n = $("li > b:contains('ASIN:')").get(0);
		if (! n) {
			n = $("li > b:contains('ISBN-10:')").get(0);
		}
		if (n && n.nextSibling && n.nextSibling.nodeName == "#text") {
			var asin = $.trim(n.nextSibling.nodeValue);
			var camelLink = "<a href='http://camelcamelcamel.com/product/" + asin + "'>Price History</a>";
			var categories = $("h2:contains('Look for Similar Items by Category')").nextAll("div.content").html();
			$("#handleBuy > div.buying").append("<div style='margin: 5px'>" + categories + camelLink + "</div>");
		}
		//$("#AutoBuyXGetY").hide();
});
