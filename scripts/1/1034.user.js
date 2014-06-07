/*

Rankforest 

    based upon the example script from Mozilla found at:
    http://ftp.iasi.roedu.net/pub/mirrors/mozdev.org/greasemonkey/linkify.user.js
*/

// ==UserScript==
// @name          Rankforest
// @namespace     http://www.romej.com
// @description   Turns ASINs into links to Rankforest detail page.
// @include       http://*.amazon.*
// @include       https://*.amazon.*
// @Version       0.0.1
// @Author        Steven Romej
// @Email         steven.romej(at)gmail.com
// ==/UserScript==

(function() {

    const urlRegex = /\b[0-9A-Z]{10}/g;
    
    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "b","body","div","li","p","span","ul" 
    ];
    
    /*
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var","ul"
        ];
    */
    //var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " +
            //"contains(translate(., 'HTTP', 'http'), 'http')]";

    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]";


    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var t0 = new Date().getTime();
    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (urlRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;
            
            cand.parentNode.replaceChild(span, cand);

            urlRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                var a = document.createElement("a");
                a.setAttribute("href", "http://www.romej.com/rankforest/detail.php?asin=" + match[0]);
                a.setAttribute("title","Track this item's SalesRank in Rankforest");
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = urlRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }
    var t1 = new Date().getTime();
    //alert((t1 - t0) / 1000);


})();


