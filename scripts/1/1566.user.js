// Helgon - Resize thumb 1.1

// ==UserScript==
// @name		Helgon - Resize thumb
// @namespace	tag:http://arvixx.blogspot.com,2005-08-10:Helgon-bild.
// @description	Changes the behaviour of thumbs of user pics so that when you click on them they will get bigger. Version 1.1
// @include	http://www.helgon.net/*
// @include	http://helgon.net/*
// ==/UserScript==

/*

Changelog:

2005-08-23 1.1
* Preparations for public release
* Added license block.

2005-08.*  1.0
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

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var foton = xpath("//IMG[@class='largeimageborder']");

for (var i = 0; i < foton.snapshotLength; i++) {
	var foto = foton.snapshotItem(i)
	if (foto.width == 40) {
		var foto_link = foto.parentNode;
		foto_link.href = "javascript: ;";
		foto_link.target = "";
		
		function creator (img) { 
			function doIt() {
			
				if (img.width == 40) {
					img.width = 100;
					img.height = 140;
				}
				else {
					img.width = 40;
					img.height = 56;
				}
			}
			return doIt;
		};
		
		foto_link.addEventListener("click", creator(foto), false);
	}
}