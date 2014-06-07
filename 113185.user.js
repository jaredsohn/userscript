// Linkify (for Cisco WebDialer)
// Author: Bitstorm
// License: GNU GPL v2 or later
// Modified from: Linkify (http://userscripts.org/scripts/review/6111)
// Modified from: Skype Linkify (http://www.questar.it/blog/developer/skypelinkify.user.js)
// which was inspired by SunRocket VoIP Dial Linkify (http://www.muehlen.com/projects/voip/voip_dial.user.js)
// which in turn was inspired by UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js)
//
//
// Match these patterns:
//  800-555-1212
//  (800) 555-1212
//  (800)555-1212
//  800-555-1212
//  800-555-1212
//  800 555 1212
//  800.555.1212
//  800/555/1212
//  8005551212
//  +1 (number)
//  + (international number)
//
// ==UserScript==
// @name           Linkify (for Cisco WebDialer)
// @namespace      http://userscripts.org/scripts/show/113185
// @description    Turn phone numbers into hyperlinks so you can click them to auto-dial using Cisco WebDialer
// @include        *
// @version        1.2
//
// @history        1.2 Clicking phone number now opens in a new tab
// @history        1.1 Uploaded to userscripts.org and added valid namespace
// @history        1.0 Cleaned up comments
// @history        0.1 First version
// ==/UserScript==

//default country prefix
const defaultPrefix= '+1';

(function () {
 	const trackRegex = /(\+\d\d?)?[\-\s\/\.]?[\(]?(\d){2,4}[\)]?[\-\s\/\.]?\d\d\d[\-\s\/\.]?(\d){3,5}\b/ig;

	function trackUrl(t) {

		if (String(t).charAt(0)!= '+') t= defaultPrefix + String(t);
		return "https://publisher/webdialer/Webdialer?destination=" + (String(t).replace(/[\-\s\/\(\)\.]/g, ""));
	}

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
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
		a.setAttribute("target", '_blank');
                lastLastIndex = trackRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }

})();