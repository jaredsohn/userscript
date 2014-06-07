// Skype Linkify for Linux (fixed for European numbers)
// Author: Daniel Gonzalez Gasull
// License: GNU GPL v2 or later
// Modified version of: 
//   Skype Linkify for Linux by Andrew Moore (http://userscripts.org/scripts/show/10990)
//   
// I just fixed the regexp to work with more numbers.
//
// ==UserScript==
// @name           Skype Linkify For Linux (fixed for European numbers)
// @description    Looks for phone numbers in the page and hyperlinks them for calling with SkypeOut (www.skype.com).  It works with Gmail contacts addressbook.
// @include        *
// ==/UserScript==

//default country prefix
const defaultPrefix= '+1';


(function () {
 	const trackRegex = /(\+\d{1,3})?[\-\s\/\.]?[\(]?(\d{2,5})[\)]?[\-\s\/\.]?(\d{3,5})[\-\s\/\.]?(\d{2,5})\b/ig;

	function trackUrl(t) {

		if (String(t).charAt(0)!= '+') t= defaultPrefix + String(t);
		return "skype:" + (String(t).replace(/[\-\s\/\(\)\.]/g, "")) + "?call";
	}

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
				//" and contains(translate(., 'HTTP', 'http'), 'http')" + 
				"]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    //var t0 = new Date().getTime();
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
