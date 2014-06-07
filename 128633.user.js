// ==UserScript==
// @name           eBay PayPal Packing Slip Pagebreak Fix
// @author         Ryan Mott / Sprout Software LLC
// @namespace      http://userscripts.org/users/175403
// @datecreated    2010-06-28
// @lastupdated    2010-06-28
// @version        1.1.0
// @license        MIT license
// @description    Fixes printing packing slips in PayPal Multi-order Shipping (each will print on a separate page, as they do in IE)
// @include        https://ship.paypal.com/powership/printpackslips*
// @match          https://ship.paypal.com/powership/printpackslips*
// ==/UserScript==

function addPrintCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	//return unless (head);
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	newCss.media = "print";
	head.appendChild(newCss);
}

addPrintCss (
	'div#pagecontent { overflow: inherit ! important; } body { margin: 0; padding: 0; }'
);