// ==UserScript==
// @name          Computerwoche RSS Advertise Skip
// @namespace     
// @description	  Skips the RSS advert page from the Computerwoche RSS
// @author        Kuki
// @include       http://da.feedsportal.com/*
// @version       0.1 (02.08.2010)
// ==/UserScript==
// ComputerwocheRSSAdSkip.user.js

/*
This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
select "Computerwoche RSS Advertise Skip", and click Uninstall.
*/

var articleLink = document.getElementsByTagName("a")[1];
location.href = articleLink;

