// ==UserScript==
// @name           Show fitting by default on the killboard
// @namespace      urn:greasemonkey:jmillikin
// @include        http://killboard.goonfleet.com/*
// ==/UserScript==

var resolve_ns = function (prefix)
{
	return {"html": "http://www.w3.org/1999/xhtml"}[prefix]
}

var xpath_foreach = function (query, step)
{
	var nodes = document.evaluate (query, document, resolve_ns, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var ii = 0; ii < nodes.snapshotLength; ii++)
	{
		step (nodes.snapshotItem (ii));
	}
}

var xpath_km_a = "//html:a[starts-with(@href, '/km') and not(contains(concat(@href, 'END'), '#itemsEND'))]";
xpath_foreach (xpath_km_a, function (a)
{
	a.href += "/fitting";
});