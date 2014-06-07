// Hello World! example user script
// // version 0.1 BETA!
// // 2005-04-25
// // Copyright (c) 2005, Mark Pilgrim
// // Released under the GPL license
// // http://www.gnu.org/copyleft/gpl.html
// //
// // --------------------------------------------------------------------
// //
// // This is a Greasemonkey user script.  To install it, you need
// // Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// // Then restart Firefox and revisit this script.
// // Under Tools, there will be a new menu item to "Install User Script".
// // Accept the default configuration and install.
// //
// // To uninstall, go to Tools/Manage User Scripts,
// // select "Hello World", and click Uninstall.
// //
// // --------------------------------------------------------------------
// //
// // ==UserScript==
// // @name          Enable Copy Paste
// // @namespace     http://www.asklaila.com
// // @description   enable copy paste on pages
// // @include       http://www.asklaila.com/*
// // @exclude          
// // ==/UserScript==

var devs=document.evaluate('//*[@onpaste]', document, null, 6, null), dev, i=0;
while(dev=devs.snapshotItem(i++)) dev.setAttribute('onpaste', null);
