// ==UserScript==
// @name           Keyboard Shortcuts
// @namespace      1
// @include        http://landgrab.net/landgrab/*
// ==/UserScript==


var insertion = document.createElement('script');
insertion.src = 'http://lgshortcuts.googlecode.com/files/lgshortcuts.js';
insertion.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(insertion);


//I could not get the script to recognize keyboard events unless I pulled it in as above.
//I have no idea why.  If you have any insight please let me know.  
//~Written by jeskin for landgrab.net