// UPC-A Linkify
// Version: 0.1
// Release: 2005-04-28
// Contact: gbsmith at gmail dot com
// License: http://creativecommons.org/licenses/by-sa/2.0/
//
//
// Changelog:
//  0.1  - 2005-04-28
//         Initial version
//
// Stolen from:
// UPS/FedEx Tracking LinkifyUPS Tracking Linkify by Justin J Novack <justin.j.novack at acm dot org>
// Which was in turn stolen from:
//  UPS Tracking Linkify (http://plutor.org/projects/greasemonkey_scripts/) by Logan Ingalls <log at plutor dot org>
//

// ==UserScript==
// @name          UPC-A Linkify
// @namespace		http://gbsmith.freeshell.org/greasemonkey/upc_a_linkify.user.js
// @description    (v0.1) Looks for items in the page that look like UPC-A codes (yes, that is redundant) but aren't hyperlinked, and converts them to links to the Internet UPC Database (http://www.upcdatabase.com/)
// @include        *
// ==/UserScript==

// UPC-A:
//  0 01234 56789 0
// Link to "http://www.upcdatabase.com/item.pl?upc=001234567890"


(function () {
	const UPCARegex = /\b(\d ?\d\d\d\d\d ?\d\d\d\d\d ?\d)\b/ig;

	// -----------------------------------------------------------------
	// See http://www.barcodeisland.com/ean13.phtml for an 
	// explanation of these checksums
	// -----------------------------------------------------------------
	function validateEAN13(in_upc)
	{
		// Clean out spaces
		var my_upc = String(in_upc).replace(/ /g, "");

		// A UPC version A is an EAN-13 with first digit '0'
		if(my_upc.length < 13) my_upc = "0" + my_upc;

		// Explode sting into individual digits
		var my_digits = my_upc.split('');
		var check_digit = my_digits[12];

		for(var i = 0, sum = 0; i < 12; i++)
		{
			// Multiply odd digits by 3
			if(i%2 == 0) sum += Number(my_digits[i]);
			else         sum += Number(my_digits[i]) * 3;
		}
		
		//alert("check = " + chk_digit + ", sum = " + sum +
		//	  ", mod = " + (10 - sum%10)%10 + ", validity = " +
		//	  (chk_digit == ((10 - sum%10)%10)));

		// Check digit is the number that must be added to 
		// sum to make it divisible by 10
		return (check_digit == ((10 - sum%10) % 10));
	}

	// -----------------------------------------------------------------
	function UPCAUrl(t)
	{
		return "http://www.upcdatabase.com/item.pl?upc=" +
			String(t).replace(/ /g, "");
	}


	// =================================================================
    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote",
		"body", "caption", "center", "cite", "code", "dd", "del", "div", "dfn",
		"dt", "em", "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5",
		"h6", "i", "iframe", "ins", "kdb", "li", "object", "pre", "p", "q",
		"samp", "small", "span", "strike", "s", "strong", "sub", "sup", "td",
		"th", "tt", "u", "var"
        ];

    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
		//" and contains(translate(., 'HTTP', 'http'), 'http')" +
		"]";

	var candidates = document.evaluate(xpath, document, null, 
									   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									   null);

	//var t0 = new Date().getTime(); // Start the clock
	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++)
	{
		// UPC Version A
		if (UPCARegex.test(cand.nodeValue))
		{
			var source = cand.nodeValue;
			var span = document.createElement("span");

			cand.parentNode.replaceChild(span, cand);

			UPCARegex.lastIndex = 0;
			for (var match = null, lastLastIndex = 0;
				 (match = UPCARegex.exec(source)); )
			{
				span.appendChild(document.createTextNode(
									 source.substring(lastLastIndex,
													  match.index)));
				// Only linkify valid UPC codes
				if(validateEAN13(match[0]))
				{
					var a = document.createElement("a");
					a.setAttribute("href", UPCAUrl(match[0]));
					a.setAttribute("title", 'Linkified to UPC Database');
					a.appendChild(document.createTextNode(match[0]));
					span.appendChild(a);
				} else {
					// Just stick this chunk of text back on unlinked
					span.appendChild(document.createTextNode(match[0]));
				}
				
				
				lastLastIndex = UPCARegex.lastIndex;
			}

			span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
			span.normalize();
		}

	}
// Print timing info...
// ---------------------------------------------------------------------
//var t1 = new Date().getTime();
//alert("DEBUG: UPC-A Linkify took " + ((t1 - t0) / 1000) + " seconds");

})();

