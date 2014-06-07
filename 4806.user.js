// Clean Gmail Print
// Greasemonkey user script 
// (C)Henrik Maagensen (henrikem@gmail.com)
// This script is released under the GPL license 
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          Clean Gmail Print
// @namespace     http://dev.hxm.dk/gm/
// @description   This script removes the Gmail logo, when you are printing an email using the built-in print function.
// @include       https://mail.google.com/mail/?&ik=*&view=pt&*
// @include	  http://mail.google.com/mail/?&ik=*&view=pt&*
// ==/UserScript==


var images = document.getElementsByTagName('img')
if (images) {
	images[0].parentNode.removeChild(images[0])
}

