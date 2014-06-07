// UPS/FedEx Tracking Linkify
// Version: 0.12
// Release: 05.18.2005
// Contact: justin.j.novack at acm dot org
// License: http://creativecommons.org/licenses/by-sa/2.0/
//
// Like my script? Found a bug? Email me...
//
// Changes: 1Z 999 999 99 9999 999 9
//     and: 9999 9999 999
//     and: T999 9999 999
//      to: http://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=1Z9999999999999999&track.x=0&track.y=0
//
// Changes: 9999 9999 9999
//      to: http://www.fedex.com/cgi-bin/tracking?action=track&language=english&cntry_code=us&initial=x&tracknumbers=701107629590
//
// Changes: 9999 9999 9999 9999 9999 99
//     and: 9999 9999 9999 9999 9999
//      to: http://trkcnfrm1.smi.usps.com/netdata-cgi/db2www/cbd_243.d2w/output?CAMEFROM=OK&strOrigTrackNum=99999999999999999999
//
// Changelog:
//  0.12 - 05/18/2005
//         Fixed UPS Regex from Marek Marasch
//  0.11 - 04/04/2005
//         Added USPS from user request
//  0.1  - 04/04/2005
//         Initial version
//
// Stolen from:
//  UPS Tracking Linkify (http://plutor.org/projects/greasemonkey_scripts/) by Logan Ingalls <log at plutor dot org>
//
// ==UserScript==
// @name           UPS/FedEx Tracking Linkify
// @namespace      http://scripts.slightlyinsane.com
// @description    (v0.11) Looks for items in the page that look like tracking numbers but aren't hyperlinked, and converts them to links to the correct tracking site.
// @include        *
// ==/UserScript==

// UPS:
//  1Z 999 999 99 9999 999 9
//  9999 9999 999
//  T999 9999 999
// Link to "http://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=1Z9999999999999999&track.x=0&track.y=0"

// FedEx:
//  9999 9999 9999
//  999999999999
// Link to http://www.fedex.com/cgi-bin/tracking?action=track&language=english&cntry_code=us&initial=x&tracknumbers=999999999999

// USPS:
//  9999 9999 9999 9999 9999 99
//  9999 9999 9999 9999 9999
// Link to http://trkcnfrm1.smi.usps.com/netdata-cgi/db2www/cbd_243.d2w/output?CAMEFROM=OK&strOrigTrackNum=99999999999999999999

(function () {
	const UPSRegex = /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/ig;
	//const UPSRegex = /\b(1Z ?\d\d\d ?\d\w\w ?\d\d ?\d\d\d\d ?\d\d\d ?\d|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/ig;
	const FEXRegex = /\b(\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/ig;
	const USARegex = /\b(\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d|\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/ig;

	function UPSUrl(t) {
		return "http://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=" + String(t).replace(/ /g, "") + "&track.x=0&track.y=0";
	}

	function FEXUrl(t) {
		return "http://www.fedex.com/cgi-bin/tracking?action=track&language=english&cntry_code=us&initial=x&tracknumbers=" + String(t).replace(/ /g, "");
	}

	function USAUrl(t) {
		return "http://trkcnfrm1.smi.usps.com/netdata-cgi/db2www/cbd_243.d2w/output?CAMEFROM=OK&strOrigTrackNum=" + String(t).replace(/ /g, "");
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

	// UPS Track
        if (UPSRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;
            
            cand.parentNode.replaceChild(span, cand);

            UPSRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = UPSRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                var a = document.createElement("a");
                a.setAttribute("href", UPSUrl(match[0]));
		a.setAttribute("title", 'Linkified to UPS');
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = UPSRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }

        // USPS Track
        if (USARegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;

            cand.parentNode.replaceChild(span, cand);

            USARegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = USARegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                var a = document.createElement("a");
                a.setAttribute("href", USAUrl(match[0]));
                a.setAttribute("title", 'Linkified to USPS');
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = USARegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }

	// FedEx Track
	if (FEXRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;
            
            cand.parentNode.replaceChild(span, cand);

            FEXRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = FEXRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                var a = document.createElement("a");
                a.setAttribute("href", FEXUrl(match[0]));
		a.setAttribute("title", 'Linkified to FedEx');
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = FEXRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }

	}
    //var t1 = new Date().getTime();
    //alert("UPS/FedEx Tracking Linkify took " + ((t1 - t0) / 1000) + " seconds");

})();
