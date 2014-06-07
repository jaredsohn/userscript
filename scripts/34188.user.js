// ==UserScript==
// @name           Scroll To Bottom
// @namespace      http://userscripts.org/users/36992/scripts
// @description    Simply scrolls to the bottom of a page.
// @author         Kwame Jeffers aka LordSnooze
// @version        0.03 : 24-Sep-2008
// @include        *
// ==/UserScript==
/*
Credits
============
(none)
============

About
============
This is a GreaseMonkey script for Flickr.com More information about GreaseMonkey can be found here: http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
============

Installation
-------------
First you need firefox...
http://mozilla.org/firefox
then you need to install GreaseMonkey...
http://greasemonkey.mozdev.org
============

History
-------------
0.03 : 24-Sep-2008 Modified @namespace
0.02 : 24-Sep-2008 Added @namespace
0.01 : 21-Sep-2008 Initial release
============

Known Issues
-------------
(none)
============

Unnecessary Comments
-------------
I added this for myself because I wanted to copy and paste information at the bottom of like 50 different pages and I got tired of opening the page and scrolling.
============


*/

function scrollToBottom() {

window.setTimeout("window.scrollTo(0, document.body.offsetHeight);", 1000);
};

window.addEventListener('mouseover',function() {
scrollToBottom()
},true);