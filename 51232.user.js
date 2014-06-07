// ==UserScript==
// @name           4chan Reply Count
// @namespace      http://userscripts.org/users/94335
// @description    Shows number of replies and images on 4chan-style boards.
// @include        */res/*.*html*
// @version        v1.1
// ==/UserScript==

var d = document;

function nsResolver(prefix)
{
	var ns = { "xhtml" : "http://www.w3.org/1999/xhtml" };
	return ns[prefix] || null;
}

var ns = d.evaluate("count(/xhtml:html)", d, nsResolver, XPathResult.NUMBER_TYPE, null).numberValue > 0 ? "xhtml:" : "";

function $node(xpath, context)
{
	xpath = xpath.replace(/(\:+)/g, "$1" + ns).replace(/(\/+)/g, "$1" + ns);
	return d.evaluate(xpath, context || d, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function $xpath(xpath)
{
	xpath = xpath.replace(/(\:+)/g, "$1" + ns).replace(/(\/+)/g, "$1" + ns);
	return d.evaluate(xpath, d, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

for(i in d.styleSheets)
{
	if(!d.styleSheets[i].disabled && d.styleSheets[i].title)
	{
		cssName = d.styleSheets[i].title.toLowerCase();
	}
	var images = $xpath("//img[@md5 or @class='thumb']");
	var replies = $xpath("//blockquote");
}

img_count = d.createElement("span");
img_count.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; padding: 2px; font-size: small;");
img_count.textContent = "Replies: " + (replies.snapshotLength - 1) + " Image Replies: " + (images.snapshotLength -1);
d.body.appendChild(img_count);