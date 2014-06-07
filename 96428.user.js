// ==UserScript==
// @name           WebShots Full Resolution Image Replacer
// @namespace      http://userscripts.org/users/28
// @description    Replaces flash loader with the original image in largest available size.
// @version        1.00
// @include        http://*webshots.com/photo/*
// ==/UserScript==

/*
ABOUT
=====

The Webshots site uses a Flash overlay over images, which makes the
actual image inaccessible.

This scipt replaces the Flash objet by the original image in the
highest available resolution:

 * Full size - the image is rendered with a green border
 * Medium size - the mage is rendered with an orange border
 
A mouse click on the image opens the image in a new browser tab.



LICENSE
=======

(C) 2009 Johannes la Poutre

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

Version 1.00 - 20090416
	- initial release

*/


// Ex. medium placeholder:
// http://image50.webshots.com/50/6/74/76/445467236rDtBQy_ph.jpg

// Ex. full resolution, sometimes unavailable
// http://image50.webshots.com/50/6/74/76/445467236rDtBQy_fs.jpg

var WS_Replace = {
	replace: function() {
		var boxx = document.getElementById('photo-frame');
		if (! boxx) {
			// GM_log('Element id=photo-frame not found');
			return;
		}
		var img = boxx.childNodes[1];
		var src = img.getAttribute('src');
		var a = document.createElement('a');
		// on error restore original source
		img.addEventListener('error', function(e) {
				img.setAttribute('src', src);
				img.setAttribute('title', 'Click for medium sized image (new Tab)');
				img.style.border = "1px solid white";
				// GM_log('High Res not available, restoring medium image size');
			}, true);
		img.style.border = "1px solid white";
		img.style.cursor = 'pointer';
		img.addEventListener('click', function(e) {
				window.open(img.getAttribute('src'),'_self');
			}, true);
		img.setAttribute('title', 'Click full sized image (new Tab)');
		img.setAttribute('src', src.replace(/_ph\./, '_fs.'));
		boxx.parentNode.replaceChild(img, boxx);
	}
}

WS_Replace.replace();
// document.addEventListener('load', WS_Replace.replace, true);