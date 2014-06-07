// ==UserScript==
// @name           Google AboutUs links
// @namespace      http://www.aboutus.org/
// @description    Provides links to AboutUs pages from Google search results.
// @include        http://www.google.*/search*
// @include        http://google.*/search*
// ==/UserScript==

var results = document.evaluate("//li[@class='g']|//li[@class='g w0']|//li[@class='g w1']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < results.snapshotLength; ++i) {
	var result = results.snapshotItem(i);
	var aulink = document.createElement("a");
	var heading = result.firstChild;
	if (heading.getAttribute("class") == "b w xsm")
		heading = heading.nextSibling.nextSibling;
	aulink.setAttribute("href", "http://www.aboutus.org/" + heading.firstChild.getAttribute("href").split(/\/+/g)[1]);
	aulink.setAttribute("style", "margin-right: 7px");
	var auimg = document.createElement("img");
	auimg.setAttribute("src", "http://www.aboutus.org/favicon.ico");
	auimg.setAttribute("style", "border-style: none");
	auimg.setAttribute("alt", "AboutUs");
	aulink.appendChild(auimg);
	result.insertBefore(aulink, result.firstChild);
}
results = null;