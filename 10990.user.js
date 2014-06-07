// Skype Linkify for Linux
// Author: Andrew Moore
// License: GNU GPL v2 or later
// Modified version of: 
//   Skype Linkify by Marco Abiuso (http://userscripts.org/scripts/show/6111)
//   VoIP Dialer Linkify by Ralf Muehlen (http://www.muehlen.com/projects/voip/voip_dial.user.js)
//   Inspired by: UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js) by Logan Ingalls
//	
//   This script should work with all versions of Linux and Skype as long a Skype has an implimeted 
//   skype-action-handler and that the browser has the already set up.
//
//   See (http://share.skype.com/sites/linux/2006/08/making_skype_links_work.html) for setting up
//   the network.protocol-handler.app.skype in any Linux web browser. Ubuntu Users in the guide change
//   "/usr/local/bin/skype-action-handler" to "/usr/bin/skype-action-handler"
//
//
//   This script should work with the M$ Windows but is UNTESTED!!!
//
//   This script was made with Greasmonkey 0.7.20070607.0 & FireFox 2.0.0.5 & Ubuntu 7.04 & Skype for Linux 1.3.0.53_API
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
// Link to "skype:<number>"
//
// ==UserScript==
// @name           Skype Linkify For Linux
// @namespace      http://amoore2600.wordpress.com/2007/07/27/callto-linkify-for-skype-with-linux/
// @description    Looks for phone numbers in the page and hyperlinks them for calling with SkypeOut (www.skype.com).
// @include        *
// ==/UserScript==

//default country prefix
const defaultPrefix= '+1';


(function () {
 	const trackRegex = /(\+\d\d?)?[\-\s\/\.]?[\(]?(\d){2,4}[\)]?[\-\s\/\.]?\d\d\d[\-\s\/\.]?(\d){3,5}\b/ig;

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
    //var t1 = new Date().getTime();
    //alert("UPS Tracking linkify took " + ((t1 - t0) / 1000) + " seconds");

})();
