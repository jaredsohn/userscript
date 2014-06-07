// ==UserScript==

// @name          change the document title on Wired.com

// @namespace     http://userscripts.org/users/473981

// @description   An example Greasemonkey script that changes the title of the document. Can be changed to display anything the user specifies in the code.

// @include       *wired.com/*
// @include       www.*wired.com*

// ==/UserScript==

// changes the title of the current document (wired.com/*) to "Home"
document.title  = 'Home';
