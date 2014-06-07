// ==UserScript==
// @name           Phone Number Identifier
// @namespace      http://userscripts.org/users/294200
// @description    Makes phone numbers clickable for foxtophone
// @include        *
// ==/UserScript==

(function () {
 	//const trackRegex = /((\d{3,})\s?\-\s?(\d{4}))|(\(\d{3}\)\s?\d{3}\s?\-\s?\d{4})|(\d{3}\s\d{4})/g;
	//const trackRegex = /(0|\+)[1-9]([0-9]|\s|\-){7,}/g;
	const trackRegex = /(^|\n|\r|\s|:|\t)(0|\+46)[1-9][0-9]{1,2}\s?\-?(([0-9]{5,})|([0-9]{2,3}(\s|\-)[0-9]{2,3}(\s|\-)[0-9]{2,3})|([0-9]{3,4}(\s|\-)[0-9]{2,3}))($|\n|\r|\s|,|\t|\.)/g;
	
	

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
                a.setAttribute("href", "tel:"+match[0].replace(/[\-\s\/\(\)\.:,]/g,"").replace("+","%2B"));
		a.setAttribute("style","color:inherit;font:inherit;text-decoration:inherit;");
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = trackRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }
    var as = document.evaluate('//a[contains(@href,"callto:")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = as.snapshotLength - 1; i >= 0; i--) {
	  as.snapshotItem(i).href = as.snapshotItem(i).href.replace("callto:", "tel:").replace("+", "%2B");
	}
})();
