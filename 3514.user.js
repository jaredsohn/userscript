/*
LAST UPDATE: 03/14/06

Modified from "Flickr - Link Original Image - (c) 2005 J.Q. la Poutre"
http://www.userscripts.org/scripts/show/2012
*/
// Facebook Get the Picture
// by aio (agentinorange{at}gmail)
//
// ==UserScript==
// @name		Facebook GtP
// @namespace	http://facebook.com
// @description	Adds a link on all thumbnails, even people you aren't friends with so you can see their 'bigger picture'
// @include      http://*.facebook.com/*
// @include      http://*.thefacebook.com/*
// ==/UserScript==

function linkToOriginal() {
	//http://photos-420.facebook.com/images/profile/1828/47/s5807420_16975.jpg
	var ll = document.evaluate("//img[contains(@src, 'facebook.com/images/profile/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var bd = document.getElementsByTagName("body")[0];
	for (var i = 0; i < ll.snapshotLength; i++) {
		var l = ll.snapshotItem(i);
		href = l.getAttribute("src");
		// replace the S ones, give 'Zoom' text
		if (href.match(/[s]{1}[0-9_]*\.jpg/)) {
			href = href.replace("/s", "/n");
			var a = document.createElement("a");
			a.setAttribute("href", href);
			a.appendChild(document.createTextNode("Zoom"));
		// replace the T ones, give '+' text
		} else if (href.match(/[t]{1}[0-9_]*\.jpg/)) {
			href = href.replace("/t", "/n");
			var a = document.createElement("a");
			a.setAttribute("href", href);
			a.appendChild(document.createTextNode("+"));
		} else {
			continue;
		}
		p = l.parentNode;
		if ("a" == p.nodeName.toLowerCase()) {
			p = p.parentNode;
		}
		var top = 0;
		var left = 1;
		var obj = l;
		while (obj.offsetParent) {
			top += obj.offsetTop;
			left += obj.offsetLeft;
			obj = obj.offsetParent;
		}
		a.style.position = "absolute";
		a.style.top = top + "px";
		a.style.left = left + "px";
		a.style.backgroundColor = "#fff";
		a.style.textDecoration = "none";
		a.style.padding = "1px";
		a.style.opacity = "0.5";
		a.style.fontSize = "9px";
		a.style.fontFamily = "verdana";
		a.style.border = "1px solid";
		a.style.borderColor = "#000";
		a.setAttribute("title", "Link to original image size");
		bd.appendChild(a);
	}
}


setTimeout(linkToOriginal, 1000);
// window.addEventListener("resize", linkToOriginal, true);
// end user script