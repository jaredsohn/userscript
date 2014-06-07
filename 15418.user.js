// ==UserScript==
// @name           Picasaweb Download Links
// @namespace      joe.lapoutre.com/gm/picasawebdl
// @description    Add direct download links below image thumbnails on Picasa overview pages
// @include        http://picasaweb.google.tld/*/*
// @version        1.01
// ==/UserScript==


/*

LICENSE
=======

Picasaweb Download Links - (c) 2007 - 2009 Johannes la Poutre

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.01 - 20090325
	- Fixed for new Picasa layout
	- works on international versions of Picasa
	- thumbnail resolution independent

Version 1.00 - 20071203
	- Initial revision


*/


// Thumb: http://lh4.google.com/Acccount/Xm8s8Dm3Cs/AAAAAAAAAh8/Bc_XUpJj3wz/s144/IMG_0001.JPG
// Image: http://lh4.google.com/Acccount/Xm8s8Dm3Cs/AAAAAAAAAh8/Bc_XUpJj3wz/IMG_0001.JPG
// referer should be current document


var PicasaWebDL = {
	openFunc: GM_openInTab,
	evtFunc: function(link) {
		return function clicFunc(evt) {
			//if (evt.currentTarget.nodeName.toLowerCase != 'a') return;
			evt.stopPropagation();
			evt.preventDefault();
			evt.returnValue = false;
			PicasaWebDL.openFunc(link);
		};
	},
	initLinks: function() {
		GM_addStyle("a.dLink { font-size: 9px; padding-left: 6px; color: blue; position: absolute; left: 0; bottom: 0; z-index: 999 } a:hover { color: red ! important; }");
		var rows = document.evaluate("//img[contains(@class, 'goog-icon-list-icon-img')]", 
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				GM_log( rows.snapshotLength);
		for (var i = 0; i < rows.snapshotLength; i++) {
			var r = rows.snapshotItem(i);
			var href = r.getAttribute('src').replace(/^(.+)\/s\d+\/(.+)$/, "$1/$2");
			var a = document.createElement('a');
			a.setAttribute("href", href);
			a.setAttribute("class", "dLink");
			a.setAttribute("title", "Click for image");
			a.appendChild(document.createTextNode('download image'));
			r.parentNode.parentNode.appendChild(a);
//			r.style.border='1px dotted magenta';
//			r.addEventListener("click", PicasaWebDL.evtFunc(href), false);
		}
	},
	init: function() {
		var btn = document.createElement('input');
		btn.setAttribute('type', 'button');
		btn.setAttribute('value', 'Init Download Links');
		btn.addEventListener('click', PicasaWebDL.initLinks, false);
		btn.style.position = 'fixed';
		btn.style.top = '40px';
		btn.style.right = '120px';
		btn.style.zIndex = '9999';
		var bdys = document.getElementsByTagName('body');
		bdys[0].appendChild(btn);
		// GM_addStyle("a.dLink { font-size: 9px; padding-left: 6px; color: blue; position: absolute; left: 0; bottom: 0; z-index: 999 } a:hover { color: red ! important; }");
	}
};

// PicasaWebDL.init();
setTimeout(PicasaWebDL.initLinks, 1000);
