// ==UserScript==
// @name       Picasaweb Download link images for Download Assistant
// @namespace  to Dl all images Gallery
// @version    1.05
// @description  Add direct download all links on Picasa overview pages with iGetter or Download Assistant
// @include        https://picasaweb.google.com/*/*
// @include        http://picasaweb.google.com/*/*
// @copyright  2011+, lolo888
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
Version 1.05 - 20130419
        - add http protocole
        - remove bug of thumbnails after init (on FireFox)
Version 1.03 - 20120118
        - rename URL image size
Version 1.02 - 20111207
        - Remove src Thumbs
        - add new user button action init
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

// changement 2012
// Thumb: http://lh4.google.com/Acccount/Xm8s8Dm3Cs/AAAAAAAAAh8/Bc_XUpJj3wz/s144/IMG_0001.JPG
// Image: http://lh4.google.com/Acccount/Xm8s8Dm3Cs/AAAAAAAAAh8/Bc_XUpJj3wz/s0/IMG_0001.JPG

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
	getElementsByClass: function (searchClass,node,tag) {
		var classElements = new Array();
		if ( node == null )
			node = document;
		if ( tag == null )
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	},
	initLinks: function() {
		GM_addStyle("a.dLink { font-size: 9px; padding-left: 6px; color: blue; position: absolute; left: 0; bottom: 0; z-index: 999 } a:hover { color: red ! important; }");
		var rows = document.evaluate("//img[contains(@class, 'goog-icon-list-icon-img')]", 
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				GM_log( rows.snapshotLength);
		for (var i = 0; i < rows.snapshotLength; i++) {
			var r = rows.snapshotItem(i);
			var href = r.getAttribute('src').replace(/^(.+)\/s\d+\/(.+)$/, "$1/s0/$2");
			//r.src = '';
			var a = document.createElement('a');
			a.setAttribute("href", href);
			a.setAttribute("class", "dLink");
			a.setAttribute("title", "Click for image");
			a.appendChild(document.createTextNode('download image'));
			r.parentNode.parentNode.appendChild(a);
		}
	},
	init: function() {
		var list = PicasaWebDL.getElementsByClass("gbtc");
		var li = document.createElement("li");
		var libar = document.createElement("li");
		li.addEventListener('click', PicasaWebDL.initLinks, false);
		li.setAttribute('class', 'gbt ini');
		libar.setAttribute('class', 'gbt gbtb');
		li.innerHTML = '<a class="gbgt" id="gbg4"><span class="gbts gbtb2">Init Download Links</span></a>';
		libar.innerHTML = '<span class="gbts"></span>';
		list[1].insertBefore(libar, list[1].firstChild);
		list[1].insertBefore(li, list[1].firstChild);

		GM_addStyle("a.dLink { font-size: 9px; padding-left: 6px; color: blue; position: absolute; left: 0; bottom: 0; z-index: 999 } a:hover { color: red ! important; }");
	}
};

PicasaWebDL.init();