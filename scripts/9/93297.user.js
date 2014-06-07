// SunRocket VoIP Dial Linkify
// Author: Ralf Muehlen
// License: GNU GPL v2 or later
// Inspired by: UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js) by Logan Ingalls
//
// Match these patterns:
//  800-555-1212
//  (800) 555-1212
// Link to "https://www.sunrocket.com/members/contacts/clickToCall.do?phoneToCall=800-555-1212&action=/viewIndex.do"
//
// ==UserScript==
// @name           SunRocket VoIP Dial Linkify
// @namespace      http://www.muehlen.com/
// @description    Looks for phone numbers in the page and hyperlinks them. When clicking on the link, your SunRocket phone will ring and connect you to the number.
// @include        *
// ==/UserScript==

(function () {
	//const trackRegex = /\b(1Z ?\w\w\w ?\w\w\w ?\w\w ?\w\w\w\w ?\w\w\w ?\w|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/ig;
	//const trackRegex = /\b(\d\d\d-\d\d\d-\d\d\d\d|\d\d\d\) \d\d\d-\d\d\d\d)\b/ig;
	const trackRegex = /(\d{3}-\d{3}-\d{4}|\(\d{3}\) ?\d{3}-\d{4}|1?\d{10}|\d{3}\.\d{3}\.\d{4})/g;
	//const trackRegex = /\b(\d\d\d\) \d\d\d-\d\d\d\d)\b/ig;

	function trackUrl(t) {
		// return "http://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=" + String(t).replace(/ /g, "") + "&track.x=0&track.y=0";
		// return "https://www.sunrocket.com/members/contacts/clickToCall.do?phoneToCall=" + String(t).replace(/\)/-/g, "") + "&action=/viewIndex.do";
		return "sip:" + String(t).replace(/\) /g, "-");
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
