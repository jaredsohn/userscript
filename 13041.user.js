// 0870 Linkify
// Inspired by: UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js) by Logan Ingalls
// and SunRocket VoIP Dial Linkify.
//
//
// ==UserScript==
// @name	     0870 Linkify
// @namespace	http://www.saynoto0870.com/
// @description    Looks for phone numbers in the page and hyperlinks them to saynoto0870.com search.
// @include	  *
// ==/UserScript==

(function () {
	  const trackRegex = /\b(0871|0870|0845|0844)([ \t\r\n]?\d){7}\b/ig;

	function trackUrl(t) {
		return "http://www.saynoto0870.com/numbersearch.php?number=" + String(t).replace(/\) /g, "-");
	}

    // tags we will scan looking for 0870 numbers
    var allowedParents = [
	  "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
	  "caption", "center", "cite", "code", "dd", "del", "div", "DIV", "dfn", "dt", "em", 
	  "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
	  "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
	  "s", "strong", "sub", "sup", "td", "table", "tr", "th", "tt", "u", "var"
	  ];
	
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" + "]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
	  if (trackRegex.test(cand.nodeValue)) {
		var span = document.createElement("span");
		var source = cand.nodeValue;
		
		cand.parentNode.replaceChild(span, cand);

		trackRegex.lastIndex = 0;
		for (var match = null, lastLastIndex = 0; (match = trackRegex.exec(source)); ) {
		    span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
		    
		    var a = document.createElement("a");
		    a.setAttribute("href", trackUrl(match[0]));
		    a.appendChild(document.createTextNode(match[0]));
		    span.appendChild(a);

		    lastLastIndex = trackRegex.lastIndex;
		}

		span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
		span.normalize();
	  }
    }

})(); 