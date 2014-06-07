// Show Missing Images
// version 0.1
// 2008-02-11
// Copyright (c) 2008, Genkisan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Show Missing Images", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Show Missing Images
// @namespace     http://ericulous.com/
// @description   Show all missing images regardless of alt text
// @include       *
// ==/UserScript==

function replaceMissingImages() {
  for (var i=0; i<document.images.length; i++) {
    img = new Image();
    img.src = document.images[i].src;
	if (img.width == 0) {
      document.images[i].title = document.images[i].src;
	  document.images[i].width = '20';
	  document.images[i].height = '20';
      document.images[i].src = 'data:image/gif,GIF89a%0E%00%10%00%B3%00%00%00%00%00%80%00%00%00%80%00%80%80%00%00%00%80%80%00%80%00%80%80%C0%C0%C0%80%80%80%FF%00%00%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%FF%FF%FF%FF%FF!%F9%04%01%00%00%0B%00%2C%00%00%00%00%0E%00%10%00%00%04R%10%C8I%D1%BA%E0%E9%BD%91%5D%D9!%8E%22%F2X%A1(%08%A3y%A6%82%22%00%22%05%AF%F4%F8H%CF(%91%87%5D%8A%C4(f%40%BD%04%D1%C18%86%1AJQ%91pA%1E%1A%D0%1A%E0%22%ECa%B3%D5%20%EF0%A9%5E%C4)%F3B%C7%7B%A89%C2%AD%DA%06%88%00%00%3B';
	}
  }
}

window.addEventListener("load", replaceMissingImages, false);