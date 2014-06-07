/*
--------------------------------------------------------------------
Blogspot Flag Restorer
--------------------------------------------------------------------
This is a Greasemonkey user script.  To install it, you need
Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
Select "Blogspot flag restorer", and click Uninstall.

It works only for certain spam blogs which use a particular script
to sneakily hide the flag button. It unhides the flag again so you 
can then report the splog to Blogger.

Hopefully it will be expanded to handle spam blogs that use other 
things like hide the navbar altogether.

By: Improbulus, http://consumingexperience.blogspot.com/
Date: 6 February 2006
--------------------------------------------------------------------
*/
// ==UserScript==
// @name         Blogspot flag restorer
// @namespace    http://consumingexperience.blogspot.com/
// @description  v0.1. Restore Blogger navbar flag in some spamblogs
// @include      http://*blogspot.com/*

// ==/UserScript==

var flagButton = document.getElementById('flagButton');
flagButton.style.display='inline';

