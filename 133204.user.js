// ==UserScript==
// @name           Linkify
// @namespace      http://youngpup.net/userscripts
// @description    Looks for things in the page that look like URLs but aren't hyperlinked, and converts them to clickable links.
// @include        *
// @revise
// @by 	jaccho@163.com
// @description	show image url to image.
// @date  Saturday, February 2, 2008
// ==/UserScript==

document.addEventListener("DOMContentLoaded",function () {
    const urlRegex = /\b(https?:\/\/[^\s+\"\<\>^\(]+)/ig;

	//revise code
	const imgPrefixes = /(jpg|gif|png|jpeg|ico)$/i;
	var showImg=true;//true to show toggle button, false to linkify image.
	
    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + 
	")]";
	// var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " +"contains(translate(., 'HTTP', 'http'), 'http')]";
	
    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	window.cands=candidates;
	
    var t0 = new Date().getTime();
    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		var url=cand.nodeValue;
        if (urlRegex.test(url)) {
			var span = document.createElement("span");
			var source = url;
			cand.parentNode.replaceChild(span, cand);
			urlRegex.lastIndex = 0;
			for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
				span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
				
				var a = document.createElement("a");
				a.setAttribute("href", match[0]);

				if(showImg && imgPrefixes.test(match[0])){
					var img = document.createElement("img");
					img.setAttribute("src", match[0]);
					img.setAttribute("alt", "Linkify image : "+match[0]);
					img.setAttribute("style","border:solid 1px Black;margin:1px;");
					a.appendChild(img);
				}else{
					a.appendChild(document.createTextNode(match[0]));
				}
				span.appendChild(a);
				lastLastIndex = urlRegex.lastIndex;
			}

			span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
			span.normalize();
        }
    }
    var t1 = new Date().getTime();
},false);