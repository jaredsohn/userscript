// ==UserScript==
// @name News Facebook link stripper - Kafke's Edit
// @description Strips out the Facebook bullshit from news links, allowing you to read the news in private. Edited by Kafke to work on all news links.
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @version 1.0
// ==/UserScript==

function stripit(links) {
	for (var i=0; i<links.length; i++) {
		var link=links[i];
		if (link.href.indexOf("redirect_uri=")>-1) {
			link.removeAttribute("onmousedown");
			link.removeAttribute("data-appname");
			link.removeAttribute("rel");
			link.setAttribute("target","_blank");
			if (link.href.indexOf("uiserver.php")>-1) {
				link.href=unescape(link.href.substr(link.href.indexOf("redirect_uri=")+13));
			}
			var qpos=link.href.indexOf("?");
			if (qpos>-1) {
				link.href=link.href.substr(0,qpos);
			} else {
				link.href=link.href;
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