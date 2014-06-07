// Hide Personalized Google Search Box v2
// version 2.0
// 2006-01-01
// based on Hide Personalized Google Search Box v1.0
// by Michael Felix - gm@mfelix.allmail.net
// http://felixfamily.net
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hide Personalized Google Search Box", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hide Personalized Google Search Box v2
// @author        Randall Wald
// @namespace     http://rwald.com
// @description   Hides the search box on personalized Google homepages (for those who use the Google toolbar and don't need it wasting their screen space). Adds a link at the top to reshow it.
// @include       http://google.*/ig*
// @include       http://www.google.*/ig*
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

var links = document.evaluate("//a[contains(@href, '/logout')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (links.snapshotLength == 0) return;
var logoutlink = links.snapshotItem(0);

link = document.createElement('a');
link.innerHTML = 'Search';
link.href= 'javascript:void(0)';
logoutlink.parentNode.insertBefore(link, logoutlink);
logoutlink.parentNode.insertBefore(document.createTextNode(' | '), logoutlink);  	

link.setAttribute("onClick", "if (this.innerHTML == 'Search') {sibling.parentNode.insertBefore(container, sibling); this.innerHTML = 'Hide Search';} else {container.parentNode.removeChild(container); this.innerHTML = 'Search';}");
