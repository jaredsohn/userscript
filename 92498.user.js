// ==UserScript==
// @name           JewTube Hide Comments
// @namespace      JewTube Hide Comments
// @include        *youtube.com/watch?v=*
// By Phiphel
// ==/UserScript==

var ul = document.getElementsByTagName("ul");
for (var i in ul) {
	if (ul[i].className == "comment-list") {
		ul[i].style.color = "white";
		ul[i].setAttribute("onmouseover", 'this.style.color = "black"');
		ul[i].setAttribute("onmouseout", 'this.style.color = "white"');
	}
}