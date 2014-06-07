// ==UserScript==
// @name           BvS Forum Ninja Lookup
// @namespace      BvS
// @include        http://*animecubed.com/billy/forum/*
// @description    Adds links to quickly access the BvS ninja lookup page from the forum.
// ==/UserScript==
/*
Copyright (c) 2009 Daniel Karlsson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

function lookupLink(name)
{
	// Create link
	var link = document.createElement("a");
	if (name == "McMasters")
		name = "11DBHK";
	link.setAttribute("href", "/billy/bvs/lookup.html?player=" + name);
	link.setAttribute("title", "Lookup " + name);
	link.innerHTML = "<img src='./images/icons/smile/info.gif' height='11px' width='11px' alt='(i)'/>";
	return link;
}

function linkifyPostAuthor()
{
	// <b class="postauthor">Name</b>
	var links = document.evaluate("//b[@class='postauthor']", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < links.snapshotLength; i++) {
		var link = links.snapshotItem(i);
		var name = link.innerHTML;
		var sibling = link.nextSibling;
		if (sibling)
			link.parentNode.insertBefore(lookupLink(name), sibling);
		else
			link.parentNode.appendChild(lookupLink(name));
	}
}

function linkifyViewProfile()
{
	// <a href="./memberlist.php?mode=viewprofile&amp;u=xxx">Name</a>
	var links = document.evaluate("//a[@href]", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < links.snapshotLength; i++) {
		var link = links.snapshotItem(i);
		// Skip images
		if (link.childElementCount > 0)
			continue;
		if (/memberlist.php.mode.viewprofile/.test(link.getAttribute("href"))) {
			var name = link.innerHTML;
			var sibling = link.nextSibling;
			if (link.parentNode) {
				if (sibling)
					link.parentNode.insertBefore(lookupLink(name), sibling);
				else
					link.parentNode.appendChild(lookupLink(name));
			}
		}
	}
}

(function() {
	linkifyPostAuthor();
	linkifyViewProfile();
}());
