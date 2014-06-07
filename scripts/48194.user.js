// ==UserScript==
// @name           Mafia Wars - Change Background Color
// @namespace      http://userscripts.org/users/36992/scripts
// @description    This will change the background color from white to black. Open Mafia Wars in a new window.
// @author         Kwame Jeffers aka LordSnooze
// @version        0.02 : 16-May-2009
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://apps.new.facebook.com/inthemafia/*
// ==/UserScript==
/*

Credits
============
(None)
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
0.03 : 18-May-2009 Added link to Mafia Wars - Direct Links in Comments
0.02 : 16-May-2009 Updated @description
0.02 : 16-May-2009 Updated @namespace
0.01 : 04-May-2009 Initial release
============

Known Issues
-------------
(none)
============

Comments
-------------
Also check out Mafia Wars - Direct Links...
http://userscripts.org/scripts/show/49312
============
Unnecessary Comments
-------------
As I am creating this right now, my eyes are killing me. I play way too much Mafia Wars.
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