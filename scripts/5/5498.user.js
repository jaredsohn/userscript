/*
 * Title: Google Book Search
 * Description: Hide search bar in Google Book Search page viewer. "Search" link added in upper right to reveal search bar.
 * Author: Joel Thornton, sun2design.com
 * Updated: 09/04/2006
 * 
 */

// ==UserScript==
// @name Google Book Search
// @namespace http://www.sun2design.com
// @description Hide search bar in Google Book Search page viewer. "Search" link added in upper right to reveal search bar.
// @include http://books.google.com/books?*
// ==/UserScript==

var stuff = new Array();
stuff = document.getElementsByName('f');
var form = stuff[0];
var container = form;
container = container.parentNode.parentNode.parentNode;

var sibling = container.nextSibling;
unsafeWindow.sibling = sibling;
unsafeWindow.container = container;
container.parentNode.removeChild(container);

var links = document.evaluate("//a[contains(@href, 'books?logout=1')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (links.snapshotLength == 0)
	links = document.evaluate("//a[contains(@href, '/Login')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (links.snapshotLength == 0)
 return;

var logoutlink = links.snapshotItem(0);

link = document.createElement('a');
link.innerHTML = 'Search';
link.href= 'javascript:void(0)';
logoutlink.parentNode.insertBefore(link, logoutlink);
logoutlink.parentNode.insertBefore(document.createTextNode(' | '), logoutlink);  	

link.setAttribute("onClick", "if (this.innerHTML == 'Search') {sibling.parentNode.insertBefore(container, sibling); this.innerHTML = 'Hide Search';} else {container.parentNode.removeChild(container); this.innerHTML = 'Search';}");
