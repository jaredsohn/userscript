// ==UserScript==
// @name           NonHTTPS
// @namespace      http://www.planb-security.net/userscripts/
// @description    A quickie little script to find the displayed non-HTTPS elements and try to make them obvious. Handy for when you suddenly find yourself on a page you thought was HTTPS but you have the broken lock "mixed content" icon in Firefox (like some Google services). For more details, just use Firebug's Net tab to figure out where things came from.
// @include        https://*
// @author         Tod Beardsley, Plan B Security	
// ==/UserScript==


window.setTimeout(

function nonHTTPS() {
	srcElements = document.evaluate('//*[translate(@src, "HTP", "htp")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	GM_log(srcElements.snapshotLength + " elements found.");
	
	for (var i = 0; i < srcElements.snapshotLength; i++) {
		thisSrc = srcElements.snapshotItem(i);
		GM_log("Element: " + thisSrc.src + "has: " + thisSrc.src.search('http://'));
		if (thisSrc.src.search('http://') == 0 ) {
			thisSrc.title = thisSrc.nodeName + ": comes from " + thisSrc.src;
			thisSrc.style.border = "medium dotted red";
			thisSrc.style.backgroundColor = "black";
			thisSrc.style.color = "green";
			thisSrc.style.zIndex = 65536;
			thisSrc.style.visibility = "visible";
			if (thisSrc.offsetWidth < 10) {
				thisSrc.style.width = "10px";
			}
			if (thisSrc.offsetHeight < 10) {
				thisSrc.style.height = "10px";
			}
		}
	}
return false;}, 300);





	