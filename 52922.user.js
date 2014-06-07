// ==UserScript==
// @name           Orkut Linkifier
// @namespace      OrkutPlus.net [Coder - Gautam]
// @description    Does not displays the Orkut nag when a user (you) click on a link in Scrapbook, Community topic or anywhere.
// @include        htt*://*.orkut.*
// ==/UserScript==
var frame = content.document.getElementById("orkutFrame");
allLinks = frame.contentWindow.document.getElementsByTagName("a");
for (var i=0; i < allLinks.length; i++) {
	var elm = allLinks[i];
	var link = elm.getAttribute("onclick");
	if (link && link.match(/_linkInterstitial/i)){
		link = link.match(/\'([^\']*)\'/)[1];
		link = link.replace(/\\0?74wbr\\0?76/g, "").replace(/\\0?75/g, "=").replace(/\\0?46/g, "&").replace(/\\76/g, "+");
		elm.setAttribute("onclick", "");
		elm.href = link;
	}
}