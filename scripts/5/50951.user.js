// ==UserScript==
// @name           Metalflirt CSS Changer
// @namespace      
// @description    This will change the CSS of the metalfirt.de Forum.
// @author         traxo
// @version        0.01 : 06-June-2009
// @include        http://www.metalflirt.de/board/*
// ==/UserScript==
/*

Credits
============
(None)
============

About
============
This is a Greasemonkey Script for MetalFlirt.
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

============

Known Issues
-------------
(none)
============

Comments
-------------
Blah.
============
*/

function s(myStyle) {
    var head;
    var style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = myStyle;
    head.appendChild(style);
}

/*
Below this comment section is where you can change the color.
You can use the name of a color or you can use HTML color codes.
Go here to find color codes...
http://www.google.com/search?hl=en&q=html+color+codes
Color code example (000000 is black)...
s('BODY          {background-color: #000000}');
*/

s('BODY          {background-color: black}');