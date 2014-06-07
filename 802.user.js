// ==UserScript==
// @name          Amazon Electronics Linky
// @namespace     http://peter.nyc.ny.us/greasemonkey/ael
// @description	  Inserts links to price comparison services when browsing electronics, 
// @description   computers, etc on Amazon.
// @include       http://*.amazon.*
// ==/UserScript==

(
function() {

	nonbookmatch = window._content.location.href.match(/\/B00\w+\//);

	if (nonbookmatch){

		var product = document.title;
		var productEnc = product.replace(/Amazon.*:\s*/,'').replace(/\s*\(.*\)\s*/, '');
		productEnc = escape(productEnc);

		var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		if (header) {
			var other = document.createElement('span');
			var s = '<br />Compare at: <a href="http://shopper-search.cnet.com/search?q=' + productEnc + '">';
			s += 'Shopper.com</a>';

			s += ' | ';
			s += '<a href="http://www.shopping.com/xFS?KW=' + productEnc + '">';
			s += 'Shopping.com</a>';

			s += ' | ';
			s += '<a href="http://www.epinions.com/search/?submitted_form=searchbar&search_string=' + productEnc+ '">';
			s += 'Epinions</a>';

			s += ' | ';
			s += '<a href="http://www.google.com/froogle?q=' + productEnc+ '">';
			s += 'Froogle</a>';

			other.innerHTML = s;
			
			header.parentNode.insertBefore(other, header.nextSibling);
		}

	} 

}
)();
