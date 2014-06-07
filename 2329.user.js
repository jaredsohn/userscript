// ==UserScript==
// @name          unFuckkerator
// @namespace     http://www.fuckk.com/
// @description	  Fix misleading onmouseover links on fuckk.com
// @include       http://*.fuckk.com/p/*.htm
// @include       http://*.fuckk.com/m/*.htm
// ==/UserScript==
// Notes:
//   * is a wildcard character


var allLinks, thisLink;
var r = new RegExp("(http[^']+)","i");
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
	thisLink = allLinks[i];
	var o = thisLink.getAttribute("onmouseover");
	if (r.test(o)) {
		var m = r.exec(o);
		thisLink.setAttribute("href", m[0]);
		thisLink.style.background='#EFEFEF';
	}
}
