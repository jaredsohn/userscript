// UK VoIP phone numbers Linkify 1.1.6
// Author: metadiver = dontaskme@theleonards.org.uk
// License: GNU GPL v2 or later
// Inspired by: the "saynoto0870" linkify by "mmmmmm" (http://www.saynoto0870.com/cgi-bin/forum/YaBB.cgi?num=1148633980) which, in turn was inspired by the SunRocket VoIP Dial Linkify (http://www.muehlen.com/projects/voip/voip_dial.user.js) which was inspired by UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js) by Logan Ingalls
//
// Matches these patterns: UK phone numbers 01234 123456, 020 1234 5678, 0123 123 4567 etc phone number format
// It's not perfect - i'm just a fiddler, not an expert - if you can tidy it up, please do, and send me a copy!
// you will need to modify the settings below in order to make it work
// mine works with gradwell, who are great -->  http://www.gradwell.com/?r=22259
// any questions? don't ask me! I just fiddle with the code until it works!
// it was tested on Greasemonkey 0.6.6.20061017.0 and Firefox 2.0.0.1
//
// ==UserScript==
// @name           UK VoIP phone numbers Linkify
// @namespace      http://www.theleonards.org.uk
// @description    Looks for UK phone numbers in pages and makes hyperlinks out of them. When clicking on the link, your VoIP phone will ring and be dialing the number / link you clicked on.
// @include        *
// ==/UserScript==


(function () {
	email = "your_VoIP_account_name";
	pass = "your_password";
	extension = "your_VoIP_extension_number";
	const trackRegex = /\b(\s*\d{5}(\s*\d){6}|\s*\d{3}((\s*\d){4}(\s*\d){4}))\b/ig;
	function trackUrl(t) {
		return "https://your_voip_provider.com/login/webcall?email=" + email + "&pass=" + pass + "&extension=" + extension + "&destination=" + String(t).replace(/\) /g, "-");
	}

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "listtitle", "object", "nobr", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "tel", "th", "tt", "u", "var"
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
    //alert("UK VoIP phone numbers Linkify took " + ((t1 - t0) / 1000) + " seconds");

})();


