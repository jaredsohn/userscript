// ==UserScript==
// @name           shrinkylinks
// @namespace      http://www.markfiend.com/scripts
// @description    For blogs and messageboards: if the link text is the same as the link destination, changes the link text to 'Clicky'
// @include        *
// ==/UserScript==
//
// If someone enters a HUUUUUUUUUUUUUUUUUUUUGE URL in a blog comment
// or BB post, it tends to give your browser a 'wide-on' -- forcing
// horizontal scrolling. This fixes that.
//
// This script is provided under the terms of the GNU General
// Public License, version 3, which can be found at
//   http://www.gnu.org/copyleft/gpl.html
// Specifically, note that this script comes with NO guarantees,
// not even the implied guarantee of merchantibility or fitness for a 
// specific purpose.

var z = document.getElementsByTagName('a');
for(i=0;i<z.length;i++) {
	var txt = z[i].innerHTML;
	if(z[i].href == txt && z[i].href != '' || txt.indexOf('http') == 0) {
		z[i].innerHTML = 'Clicky';
	}
}