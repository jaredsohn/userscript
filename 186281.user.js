// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// TankenSpank
// http://www.firefallthegame.com
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
 // select "URL Replacer", and click Uninstall.
//Author : TankenSpank
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Firefall - Obsolete Melder URL Replacer
// @namespace     http://googlesystem.blogspot.com
// @description   Replaces each Melder URL based on www.savage-software.com with the same one based on astrekassociation.com
// @include       http://forums.firefallthegame.com/*
// ==/UserScript==
var pagelinks = document.getElementsByTagName('a');
var oldurl_regex = /http:\/\/www\.savage-software\.com\/melder\.php/;
for (var i = 0; i < pagelinks.length; i++) { 
    var a = pagelinks[i];
    if (a.href.match(oldurl_regex)) {
        a.href = a.href.replace(oldurl_regex, "http://astrekassociation.com/melder.php");
    }
}