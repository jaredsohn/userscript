Ã¯Â»Â¿// Helgon - Gallery open all 1.0

// ==UserScript==
// @name          Helgon - Gallery open all
// @namespace     tag:http://arvixx.blogspot.com,2005-08-26 :Helgon - Gallery open all
// @description   This scripts adds a link in the gallery which lets the user open all the pictures in tabs. It also adds links under each category, allowing the user to open all pictures from that category.
// @include       http://www.helgon.net/Gallery2/Gallery.asp?ID=*
// @include       http://helgon.net/Gallery2/Gallery.asp?ID=*
// ==/UserScript==

/*

Changelog:

2005-08-26 1.0
* Initial version

*/

/*
BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson / arvid.jakobsson@gmail.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
 */

function xpath(query, context) {
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function openLinks(links) {
	for (var i = 0; i < links.snapshotLength; i++) {
		GM_openInTab(links.snapshotItem(i).href);
	}
}

function creator(links) {
	return function () {
		openLinks(links);
	};
}

//Check version
if (!GM_openInTab) {
	alert("You need Greasemonkey 0.5 or a later version to use this script");
}

var headlines = xpath("//TD[@class='headline']", document);

//If the gallery is emtpy, quit
var gallery_hl = headlines.snapshotItem(0);
if (gallery_hl.innerHTML.match(/.* galleri \(([0-9]+) bilder\)/)[1] == 0)
	return;

//Open all pictures in tabs link	
var openlink = document.createElement("a");
openlink.href = "javascript: ;";
openlink.innerHTML = gallery_hl.innerHTML;
openlink.title = "ÃÂppna alla bilder i galleriet i flikar";
var imglinks = xpath("//A[contains(@href, 'View.asp')]", document);
openlink.addEventListener("click", creator(imglinks), false);
gallery_hl.replaceChild(openlink, gallery_hl.childNodes[0]);


//Open all pictures in tabs link for each category
for (var i = 1; i < headlines.snapshotLength; i++) {
	headline = headlines.snapshotItem(i);
	
	var openlink = document.createElement("a");
	openlink.href = "javascript: ;";
	openlink.innerHTML = headline.innerHTML;
	openlink.title = "ÃÂppna alla bilder i den hÃÂ¤r kategorin i flikar";
	//Helgons HTML is all fucked up, some heavy xpath is needed. This will get the table under the headline and then all img links containing "View.asp" in this table 
	var imglinks = xpath("./parent::TR/parent::TBODY/parent::TABLE/following-sibling::TABLE[1]//A[contains(@href, 'View.asp')]", headline);
	
	openlink.addEventListener("click", creator(imglinks), false);
	headline.replaceChild(openlink, headline.childNodes[0]);
}