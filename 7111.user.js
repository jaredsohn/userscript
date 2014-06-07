// hqbeat.com direct images
// version 1.0.0
// created: 12 Jan 2007
// revised: 12 Jan 2007
// Copyright (c) 2007, neo_ch

// ==UserScript==
// @name			hqbeat.com direct images
// @author			Samuel Robyr			
// @namespace		http://userscripts.org/people/13948
// @description		Bypass the individual pages for images hosted by hqbeat.com
// @include			*
// ==/UserScript==

// COMMENTS:

// EXAMPLES:
// link:  http://photos.hqbeat.com/viewer.php?id=opt1168398703a.jpg
// image: http://photos.hqbeat.com/images/opt1168398703a.jpg

(function(){

	var links = document.getElementsByTagName('a');

	for (var i=0; i<links.lenght; i++) {
		alert(links[i].href);
		if (links[i].href.indexOf('hqbeat.com/') != -1) {
			alert(links[i].href);
			var link = links[i].childNodes[0].getAttribute('href');
			links[l].href = link.replace('viewer.php?id=', 'images/');
		} // if
	} // for

})()

/*// ==UserScript==
// @name           Linkify
// @namespace      http://youngpup.net/userscripts
// @description    Looks for things in the page that look like URLs but aren't hyperlinked, and converts them to clickable links.
// @include        *
// ==/UserScript==

(function () {
    const urlRegex = /\b(https?:\/\/[^\s+\"\<\>]+)/ig;

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " +
                "contains(translate(., 'HTTP', 'http'), 'http')]";

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
                a.setAttribute("href", match[0]);
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

})();*/
