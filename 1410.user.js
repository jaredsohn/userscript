
// Stop The Presses!
// version 0.7 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that changes links to articles
// on popular news sites to point to the printer-friendly version
// instead.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Stop The Presses!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Stop The Presses!
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   make links point to printer-friendly versions whenever possible
// @include       *
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

var pageAddr, links, a, href;
pageAddr = window.location.href;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    href = a.href;
    
    // Yahoo News
    if ((href.match(/\/\/(story\.)?news\.yahoo\.com\//i)) && 
	((href.match(/sid=/i)) || (href.match(/tmpl=story/i))) && 
	(!href.match(/printer=1/i))) {
	if (href.match(/\?/i)) {
	    href += '&printer=1';
	} else {
	    href += '?printer=1';
	}
    }
    
    // NYTimes
    if ((href.match(/nytimes\.com\/2/i)) &&
	(!href.match(/pagewanted=/i))) {
	if (href.match(/\?/i)) {
	    href += '&pagewanted=print';
	} else {
	    href += '?pagewanted=print';
	}
    }
    
    // CNET
    if (((href.match(/com\.com\//i)) ||
	 (href.match(/cnet\.com\//i)) ||
	 (pageAddr.match(/com\.com\//i)) ||
	 (pageAddr.match(/cnet\.com\//i))) &&
	(href != a.textContent)) {
	href = href.replace(/2100-/g, '2102-');
	href = href.replace(/2008-/g, '2102-');
    }
    
    // Washington Post
    if ((href.match(/washingtonpost\.com\/wp\-dyn\/content\/article/i)) &&
       (!href.match(/_pf\./i))) {
        href = href.replace(/.html/g, '_pf.html');
    }

    if (href != a.href) {
	a.href = href;
	a.onclick = null;
    }

}

//
// ChangeLog
// 2005-07-08 - 0.7 - MAP - added license block
// 2005-05-02 - 0.6 - MAP - added support for Washington Post
// 2005-05-02 - 0.5 - MAP - removed anon function wrapper, require GM 0.3
// 2005-04-21 - 0.4 - MAP - linted
// 2005-04-18 - 0.3 - MAP - tidy code
//
