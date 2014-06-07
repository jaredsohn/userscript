// Existenz.se link fixer
// 2011-04-14
// Copyright (c) 2011, AkukaMun
// Released under the WTFPL license
// http://sam.zoy.org/wtfpl/COPYING
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Existenz.se link fixer
// @namespace     http://existens.se/
// @description   Fixing existenz.se
// @include       http://existenz.se/out.php?id=*
// ==/UserScript==

var iframe = document.getElementsByTagName('iframe');

var link = iframe[0].getAttribute("src");

window.location.href = link;
