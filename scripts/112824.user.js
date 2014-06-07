// FB eraser
// Version 1.0.0
// Sept 11, 2011
// Copyright (c) 2011 USA, Lone Hood (TM)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "FB eraser", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FB eraser
// @namespace     Lone Hood
// @description   Gets rid of unwanted posts on FB
// @include       *.facebook.*
// @require       http://sizzlemctwizzle.com/updater.php?id=112824
// @require       http://code.jquery.com/jquery-1.6.2.min.js
// ==/UserScript==

var name = ["Monday","Tuesday","Wednesday","Thursday"];

for (index = 0;index<=name.length;index=index+1)
{
   $("span.messageBody:contains('"+name[index]+"')").css('color','#FFFFFF');

   $("span.commentBody:contains('"+name[index]+"')").css('color','#EDEFF4');
}


