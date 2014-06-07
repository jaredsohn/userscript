// Vonage Dial Linkify
// Author: Brian Murray
// License: GNU GPL v2 or later
// Inspired by: SunRocket VoIP Dial Linkify (http://www.muehlen.com/projects/voip/voip_dial.user.js) which was inspired by UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js) by Logan Ingalls
//
// Matches these patterns:
//  800-555-1212
//  (800) 555-1212
//  (800)555-1212
//  8005551212
//    Weak since it does any 10+ digit number
//  800.555.1212
// Tested with:
//  www.yellowpages.com
//  local.google.com
//  a9.com
//
// Need to have it add a 1 if it is long distance?
//  Doesn't seem to be needed
// International calling sure would be neat
// ==UserScript==
// @name           Vonage Dial Linkify
// @namespace      http://www.murraytwins.com/code/
// @description    Looks for phone numbers in pages and makes hyperlinks out of them. When clicking on the link, your Vonage phone will ring and be dialing the number / link you clicked on.
// @include        *
// ==/UserScript==

(function () {
	username = "";
	password = "";
	mynumber = "";
	// mynumber should start with a 1
	//const trackRegex = /\b(1Z ?\w\w\w ?\w\w\w ?\w\w ?\w\w\w\w ?\w\w\w ?\w|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/ig;
	const trackRegex = /(\d{3}-\d{3}-\d{4}|\(\d{3}\) ?\d{3}-\d{4}|1?\d{10}|\d{3}\.\d{3}\.\d{4})/g;
	function trackUrl(t) {
		return "https://secure.click2callu.com/tpcc/makecall?username=" + username + "&password=" + password + "&fromnumber=" + mynumber + "&tonumber=" + String(t).replace(/[\(\)\- \.]/g, "");
	}

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "nobr", "pre", "p", "q", "samp", "small", "span", "strike", 
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
    //var t1 = new Date().getTime();
    //alert("Vonage Dial linkify took " + ((t1 - t0) / 1000) + " seconds");

})();
