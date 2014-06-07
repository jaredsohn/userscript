// ==UserScript==
// @name           Android Market QR image enlarger
// @namespace      http://userscripts.org/users/28
// @description    Enlarge the QR code image so it's easier to snap it from your phone cam
// @include        http://www.cyrket.com/package/*
// @include        http://www.androlib.com/*
// @version        1.01
// ==/UserScript==

/*
LICENSE
=======

(c) 2009 Johannes la Poutre


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


Version 1.01 - 20091119
	- More generic version enlarges any QR < 150 px
	- Added Androlib.com


Version 1.00 - 20090825
	- Initial release
	
*/

({
	minSize: 150, // minimum size of QR in pixels
	// http://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=market://search?q=pname:com.sprx.layar
	init: function() {
		var rows = document.evaluate("//img[contains(@src, 'chart.apis.google.com/chart')][contains(@src, 'cht=qr') and contains(@src, 'chs=')]", 
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < rows.snapshotLength; i++) {
			var im = rows.snapshotItem(i);
			var idx = im.src.indexOf('chs=');
			if (idx > -1) {
				var size = parseInt(im.src.substring(idx + 4), 10);
				if (size && size < this.minSize) {				
					im.src = im.src.replace(/chs=\d+x\d+/, 'chs='+this.minSize+'x'+this.minSize);
					im.style.width = this.minSize+'px';
					im.style.height = this.minSize+'px';
				}
			}
		}
	}
}).init();