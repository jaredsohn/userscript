// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name          Copy WordPress Navigation Links
// @description   Copy WordPress Navigation Links to the bottom of the page, below the comments, so you don't have to scroll back up to use them.
// @include       http://*popup.co.il/?p=*
// @include       http://*room404.net/?p=*
// @include       http://*anecdotot.net/?p=*
// ==/UserScript==

var d = document;
function getElementByClass(tagName, className)
{
	var elements = d.getElementsByTagName(tagName);
	for(var i = 0; i < elements.length; ++i)
		if(elements[i].className == className)
			return elements[i];
}

var navDiv = getElementByClass("div", "navigation");
var comments = getElementByClass("ol", "commentlist") || d.getElementById("commentlist");
if(navDiv && comments)
{
	comments.parentNode.insertBefore(navDiv.cloneNode(true), comments.nextSibling);
	comments.parentNode.parentNode.insertBefore(navDiv.cloneNode(true), comments.parentNode);
}

