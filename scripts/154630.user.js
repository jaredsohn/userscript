// Click to Dial SIP
// Author: Fiver.com/hybriditservices
// Made For: Paul Harvey
// License: GNU GPL v2 or later
// Modified version of:
//  Phone to Tel by Phone Guy (http://userscripts.org/scripts/show/56262)
//  Skype Linkify by Marco Abiuso (http://userscripts.org/scripts/show/10990)
//  VoIP Dialer Linkify by Ralf Muehlen (http://www.muehlen.com/projects/voip/voip_dial.user.js)
//  Inspired by: UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js) by Logan Ingalls
//
//
// ==UserScript==
// @name           Click to Dial SIP
// @namespace      http://fiverr.com/hybriditservice
// @description    Looks for phone numbers in the page and hyperlinks them for calling with any app registered to the sip: URI
// @include        *
// ==/UserScript==

//default country prefix
//console.log('This script grants no special privileges, so it runs without security limitations.');
const defaultPrefix= '+1';


(function () {
 	//const trackRegex = /(\+\d\d\d?)?[\-\s\/\.]?[\(]?(\d){2,4}[\)]?[\-\s\/\.]?\d\d\d[\-\s\/\.]?(\d){2,4}\b/ig;
        const trackRegex = /(\+\d\d\d?)?[\-\s\/\.]?[\(]?(\d?\d?){2,5}[\)]?[\-\s\/\.]?\d\d\d?\d?[\-\s\/\.]?(\d){2,5}\b/ig;                                         
	//const trackRegex = /\(?1300|1800|04)\b/ig;
	//const trackRegex =  /((\d{3})\s?\-\s?(\d{4}))|(\(\d{3}\)\s?\d{3}\s?\-\s?\d{4})|(\d{3}\s\d{4})|(\d{11})/g;
	//const trackRegex = /(\+61)\s\(2|4|3|7|8)){0,1}\){0,1}(\ |-)(\ |\s){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-)(\ |\s){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}\b/ig;


	function trackUrl(t) {

		if ((String(t).charAt(0) == '1')||(String(t).charAt(1) == '1')) 
		{
		t= String(t);
		return "sip:" + (String(t).replace(/[\-\s\/\(\)\.]/g, ""));
		}		
		if ((String(t).charAt(0) != '+')&&(String(t).charAt(1) != '1')) 
		{
		t= defaultPrefix + String(t).replace("0","");
		return "sip:" + (String(t).replace(/[\-\s\/\(\)\.]/g, ""));
		}
		if ((String(t).charAt(0) == '+')||(String(t).charAt(1) == '6')) 
		{
		t= String(t);
		return "sip:" + (String(t).replace(/[\-\s\/\(\)\.]/g, ""));
		}
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