// ==UserScript==
// @name			eBay Linkify
// @namespace		BrickLink.jdb992
// @description		Turns eBay auction ID's into working links.
// @include			http://www.bricklink.com/message.asp*
// @include			http://www.bricklink.com/myMsg.asp*
// ==/UserScript==

// THIS SCRIPT IS NOT ENDORSED AND/OR SPONSORED BY BRICKLINK NOR EBAY
// Some minor modifications (mainly cosmetic) to Justin Novack's "UPS/FedEx Tracking Linkify" userscript.

// Version: 0.00

(function () {
	const ebAucIDRegex = /\d{12}/g;	//An eBay Auction ID number is 12 digits as of late August 2011.
	
	function ebUrl(s){return 'http://cgi.ebay.com/'+ String(s).replace(/ /g, "");}

	// Modified as BrickLink doesn't have many html tags.  I doubt all of these are even used.
	// The only major changes besides the removal of the certainly unused tags were the addition of "Frame" and "Frameset".
	var allowedParents = [
		"b", "big", "blockquote", "body", "center", "del", "div", "em", "fieldset", "font", "form", "frame", "frameset",
		"h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe", "pre", "p", "q", "samp", "small", "span", "strike", 
		"s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
		];
    
	// DO NOT TOUCH THE xpath ASSIGNMENT STATEMENT (Unless you know what you're doing; Lest the tables look all messed up).
	// All I did was remove that line that Novack commented out and concatenated the rest of the code to one line.
	var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]";
	
	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {

		var span = document.createElement("span");
		var source = cand.nodeValue;
            
		cand.parentNode.replaceChild(span, cand);

		ebAucIDRegex.lastIndex = 0;
		for (var match = null, lastLastIndex = 0; (match = ebAucIDRegex.exec(source)); ) {
			span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

			var a = document.createElement("a");									// <a></a>
			a.setAttribute("style", "text-decoration:overline underline");			// <a style="text-decoration:overline underline"></a>
			a.setAttribute("title", "Linkified with eBay Linkify!");				// <a ... title="Linkified with eBay Linkify!"></a>
			a.setAttribute("target", "_blank");										// <a ... target="_blank"></a>
			a.setAttribute("href", ebUrl(match[0]));								// <a ... href="[LINK]"></a>
			a.appendChild(document.createTextNode("eBay Auction ID "+match[0]));	// <a ... >eBay Auction ID </a>
			span.appendChild(a);
			lastLastIndex = ebAucIDRegex.lastIndex;
		}
		span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
		span.normalize();
	}
})();