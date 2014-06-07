// ==UserScript==
// @name Guardian Facebook link stripper
// @namespace http://www.a-i-media.co.uk/facebookguardian
// @description Strips out the Facebook bullshit from Guardian links, allowing you to read the news in private.  Uses anonym.to to remove the REFERRER (which would redirect back to facebook, grrrrr...)
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @version 1.2.2
// ==/UserScript==

function stripit(links) {
	for (var i=0; i<links.length; i++) {
		var link=links[i];
		if (link.href.indexOf("guardian.co.uk")>-1) {
			link.removeAttribute("onmousedown");
			var qpos=link.href.indexOf("?");
			if (qpos>-1) {
				link.href="http://anonym.to?"+link.href.substr(0,qpos);
			} else {
				link.href="http://anonym.to?"+link.href;
			}
		}
	}
}

stripit(document.links);
document.addEventListener('DOMNodeInserted',
function(e) {
    var src=e.srcElement;
    if (src.nodeType==1) stripit(src.getElementsByTagName("a"));
    return true;
},
false);
