// IP Address Linker
// Author: Brent Norris
// License: GNU GPL v2 or later
//
// This was modified from the VOIP Phone number Linker which was taken from a UPS tracker Linker
//
// ==UserScript==
// @name           IP Address Linker 
// @namespace      http://www.brentnorris.net/
// @description    Looks for IP Addresses in the page and hyperlinks them. 
// @include        *
// ==/UserScript==

(function () {
//	const trackRegex = /(\d{1,3}\.){3}/g;
//	const trackRegex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g;	
	const trackRegex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;

	function trackUrl(t) {
		return "http://" + String(t).replace(/\) /g, "-");
	}

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
				//" and contains(translate(., 'HTTP', 'http'), 'http')" + 
				"]";

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
