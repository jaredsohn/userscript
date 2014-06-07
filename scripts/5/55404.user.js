// ==UserScript==
// @name           Add map links to the killboard
// @namespace      urn:greasemonkey:jmillikin
// @include        http://killboard.goonfleet.com/*
// ==/UserScript==

var XHTML_NS = "http://www.w3.org/1999/xhtml";

var resolve_ns = function (prefix)
{
	return {"x": XHTML_NS}[prefix]
};

var xpath_foreach = function (root, query, step)
{
	var nodes = document.evaluate (query, root, resolve_ns, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var ii = 0; ii < nodes.snapshotLength; ii++)
	{
		step (nodes.snapshotItem (ii));
	}
};

var append_a = function (to, text, href)
{
	var a = document.createElementNS (XHTML_NS, "a");
	a.href = href;
	a.textContent = text;
	
	to.parentNode.insertBefore (document.createTextNode("]"), to.nextSibling);
	to.parentNode.insertBefore (a, to.nextSibling);
	to.parentNode.insertBefore (document.createTextNode(" ["), to.nextSibling);
};

// For killmails
xpath_foreach (document, "id('topkill')", function (kill)
{
	// Find the region name, and add its map link
	var region = null;
	xpath_foreach (kill, "x:a[starts-with(@href, '/region')]", function (a)
	{
		region = a.textContent.replace (/ /g, "_");
		append_a (a, "Map", "http://evemaps.dotlan.net/map/" + region);
	});
	if (region === null) { return; }
	
	// Direct link to the system map
	xpath_foreach (kill, "x:a[starts-with(@href, '/system')]", function (a)
	{
		var system = a.textContent.replace(/ /g, "_");
		append_a (a, "Map", "http://evemaps.dotlan.net/map/" + region + "/" + system);
	});
	
});

// For killmail lists (eg on front page)
// xpath from http://pivotallabs.com/users/alex/blog/articles/427-xpath-css-class-matching
xpath_foreach (document, "//x:td[contains(concat(' ',normalize-space(@class),' '), ' listSystem ')]", function (system_td)
{
	// Region name
	var region = null, system = null;
	xpath_foreach (system_td, "x:a[starts-with(@href, '/region')]", function (a)
	{
		region = a.textContent.replace (/ /g, "_");
	});
	if (region === null) { return; }
	
	// System name
	xpath_foreach (system_td, "x:a[starts-with(@href, '/system')]", function (a)
	{
		system = a.textContent.replace(/ /g, "_");
	});
	
	// Append link here, to avoid inserting more than one in case markup changes
	system_td.appendChild(document.createElementNS (XHTML_NS, "br"));
	append_a (system_td.lastChild, "Map", "http://evemaps.dotlan.net/map/" + region + "/" + system);
});