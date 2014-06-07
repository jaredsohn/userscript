// ==UserScript==
// @name           ModernTales MvNav
// @namespace      tag:elemecca@gmail.com,2009-03-10:GM
// @description    Moves the page navigation (Forward, Back, etc.) buttons above the comment block on ModernTales comic pages.
// @include        http://www.moderntales.com/*comics/*.php*
// @include        http://www.girlamatic.com/*comics/*.php*
// @include        http://www.serializer.net/*comics/*.php*
// @include        http://www.graphicsmash.com/*comics/*.php*
// @include        http://www.webcomicsnation.com/*/series.php*
// ==/UserScript==

var result;
var nav;
var page;

// Find the nav table
result = document.evaluate (
	"//td[@width='100%']/descendant::table[not(boolean(@width) or boolean(@border))]",
	document,
	null,
	XPathResult.FIRST_ORDERED_NODE_TYPE,
	null );
nav = result.singleNodeValue;

// find the comment head table
result = document.evaluate (
	"//td[@width='100%']/descendant::div/descendant::table[@width='100%']",
	document,
	null,
	XPathResult.FIRST_ORDERED_NODE_TYPE,
	null );
page = result.singleNodeValue;

// Die gracefully if it *really* didn't work
if (!nav || !page)
{
	GM_log ("Apparently the layout of this site changed.");
	return;
}

// Remove the nav table from where it is
nav.parentNode.removeChild (nav);

// Put it before the comment head
page.parentNode.insertBefore (nav, page.nextSibling);
