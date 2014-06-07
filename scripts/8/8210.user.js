
// Facebook OneClickStalk
// version 0.2 BETA!
// 2007-03-28
// Copyright (c) 2007 Kevin Lim, Geoff Morris, Neal Fultz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Facebook OneClickStalk", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook OneClickStalk
// @namespace     http://condimentking.com/greasemonkey/
// @description   Facebook is for stalking. This saves everyone a little bit of time. This speeds up your everyday Facebook stalking by linkifying a person's name on their profile. Click on the name, and you'll be taken to Google, so you can commence googlestalking that hottie you've found on da 'Book.

// @include       http://*.facebook.com/profile.php*
// ==/UserScript==
// CHANGELOG
// 0.2 : Fixed XPATH; was broken due to Facebook site changes.


//xp = "//div[@id='profilepagewidecolumn']/div[1]/div[1]/h2";
xp ="//div[@id='profilepagewidecolumn']/div[1]/div/div[1]/div/h2";

nodes = document.evaluate(xp, document, null, XPathResult.ANY_TYPE, null);

node = nodes.iterateNext();

name = node.lastChild.nodeValue;

url = "http://www.google.com/search?q='" + name + "'";

a = document.createElement("a");
a.setAttribute("href", url);
a.setAttribute("target", "_new");

a.innerHTML = name;

node.replaceChild(a, node.lastChild);
