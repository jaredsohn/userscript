// ==UserScript==
// @name           Forbes - Skip Welcome Screen
// @namespace      http://userscripts.org/users/36992/scripts
// @description    Skips the welcome screen; The one with the "Thought of the Day" and the full page ad. Pretty much simulates clicking the link, "Skip this welcome screen", as soon as the welcome screen loads.
// @author         Kwame Jeffers aka LordSnooze
// @version        0.02 : 24-Sep-2008
// @include        http://www.forbes.com/fdc/welcome_mjx.shtml
// ==/UserScript==
/*

Credits
============

============

About
============
This is a GreaseMonkey script. More information about GreaseMonkey can be found here: http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
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
0.02 : 24-Sep-2008 Added @namespace
0.01 : 03-Jul-2008 Initial release
============

Known Issues
-------------
(none)
============

Unnecessary Comments
-------------
I go to the site quite often and after so many days of seeing the welcome screen, I had to put something together. Grr!
============
*/
setTimeout('goBack()',0);