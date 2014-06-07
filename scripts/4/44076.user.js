// Callto: Gmail Linkify (for Skype)
// Author: Jim Phillips
// License: GNU GPL v2 or later
// Modified from: Callto: Linkify (for Skype) (http://userscripts.org/scripts/show/5935)
// which was modified from: Skype Linkify (http://www.questar.it/blog/developer/skypelinkify.user.js)
// which was inspired by SunRocket VoIP Dial Linkify (http://www.muehlen.com/projects/voip/voip_dial.user.js)
// which in turn was inspired by UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js)
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
// Link to "callto:<formated number>" ("skype:" also OK)
//
// ==UserScript==
// @name           Gmail Linkify (for Skype)
// @namespace    http://userscripts.org/scripts/show/44076
// @description    Looks for phone numbers in Gmail message view pages and makes hyperlinks out of them. When clicking on the link, your Skype will ring and be dialing the number / link you clicked on.
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

//default country prefix
const defaultPrefix= '+1';
const trackRegex = /(\+\d\d?)?[\-\s\/\.]?[\(]?(\d){2,4}[\)]?[\-\s\/\.]?\d\d\d[\-\s\/\.]?(\d){3,5}\b/ig;

window.addEventListener('load', function() {
  if (frames.js.gmonkey) {
    frames.js.gmonkey.load('1.0', function(gmail) {
        function trackUrl(t) {
                if (String(t).charAt(0)!= '+') t= defaultPrefix + String(t);
                return "callto:" + (String(t).replace(/[\-\s\/\(\)\.]/g, ""));
        }
        function skypeLinkify() {
            if ((gmail.getActiveViewType() == 'cv') || (gmail.getActiveViewType() == 'ct')) {

                // tags we will scan looking for un-hyperlinked urls
                var allowedParents = [
                    "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
                    "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
                    "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
                    "ins", "kdb", "li", "nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
                    "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var" 
                    ];
                var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" + "]";
                var candidates = document.evaluate(xpath, gmail.getActiveViewElement(), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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
            }
            return;
        }
        gmail.registerViewChangeCallback(skypeLinkify);
    });
  }
}, true);