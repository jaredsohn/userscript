// ==UserScript==
// @name           Kickmania - Get Free Coins (Daily)
// @namespace      http://userscripts.org/users/36992/scripts
// @description    When accessing the page, this simply clicks the submit button to get the free coins. Just have something automated launch the page like nircmd.exe. Check my comments.
// @author         Kwame Jeffers aka LordSnooze
// @version        0.01 : 06-Jun-2009
// @include        http://apps.facebook.com/kick_ass/earn.php*
//
// ==/UserScript==


/*

Credits
============
Nir Sofer created nircmd.exe
Brilliant guy.
============

About
============
This is a GreaseMonkey script for Flickr.com More information about GreaseMonkey can be found here:
http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
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
0.01 : 06-Jun-2009 Initial release
============

Known Issues
-------------
(none)
============

Comments
-------------
I use Scheduled Tasks (WindowsXP) to open this page on a daily basis.
The literal contents of the Run field (in the scheduled event properties) is...
c:\Dosutil\nircmd.exe shexec "open" "http://apps.facebook.com/kick_ass/earn.php"

Mine runs daily at 9pm. Yours may differ.

You will need nircmd.exe (very powerfull Windows tool)...
http://www.google.com/search?q=nircmd.exe
============

Unnecessary Comments
-------------
Once I get a dog, I'm going to name him GreaseMonkey!
============
*/


var tmpEle = document.getElementsByTagName('Input')

for(k=0; k<tmpEle.length; k++) {
	if (tmpEle[k].value == 'Get Free Coins') {
			tmpEle[k].click()
	}
}