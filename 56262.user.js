// Phone To Tel
// Author: Phone Guy
// License: GNU GPL v2 or later
// Modified version of: 
//  Skype Linkify by Marco Abiuso (http://userscripts.org/scripts/show/10990)
//   VoIP Dialer Linkify by Ralf Muehlen (http://www.muehlen.com/projects/voip/voip_dial.user.js)
//   Inspired by: UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js) by Logan Ingalls
//
// Match these patterns:
//  800-555-1212
//  (800) 555-1212
//  (80) 555-1212
//  80-555-1212
//  800-555-12123
//  800 555 1212
//  800/555/1212
//  +1 <number>
//  +39 <number>
// Link to "tel:<number>"
//
// ==UserScript==
// @name           Phone To Tel
// @namespace      http://ocshacks.blogspot.com/
// @description    Looks for phone numbers in the page and hyperlinks them for calling with any app registered to Tel URI (most notably Microsoft Office Communicator)
// @include        *
// ==/UserScript==

//default country prefix
const defaultPrefix= '+1';


(function () {
 	const trackRegex = /(\+\d\d?)?[\-\s\/\.]?[\(]?(\d){2,4}[\)]?[\-\s\/\.]?\d\d\d[\-\s\/\.]?(\d){3,5}\b/ig;

	function trackUrl(t) {

		if (String(t).charAt(0)!= '+') t= defaultPrefix + String(t);
		return "tel:" + (String(t).replace(/[\-\s\/\(\)\.]/g, ""));
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
            var image= document.createElement("IMG");
            image.setAttribute("src", "logo.png\n");
         
        }
    }

})();