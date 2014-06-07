// ==UserScript==
// @name           I can count, really!
// @namespace      http://unidomcorp.com
// @description    Count the number of colonies.
// @include        http://*.war-facts.com/*
// ==/UserScript==

var colmen = document.getElementById('colmen');

var colmenheader = document.evaluate("//tr/td/strong/a[text()='Colonies']/../..", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();

var colview = unsafeWindow.colview;
if (!colview) unsafeWindow.listcols();
if (colmen.childNodes[0])
{
	for (var i = 0, j =0, table = colmen.childNodes[0], len = table.rows.length; i < len; i++)
	{
		if (table.rows[i].cells[0].innerHTML.indexOf('view_colony.php') != -1) j++;
	}
	var howmany = document.createTextNode(' ('+j+')');
	colmenheader.appendChild(howmany);
}
if (!colview) unsafeWindow.listcols();
