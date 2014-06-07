// Craiglist Jackass Flag
// Version 1.01
// 2009-05-27
// Copyright (c) 2009, Paul Venuti
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.8 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select 'Craiglist Jackass Flag', and click Uninstall.
//
// --------------------------------------------------------------------
//
// Change History
//
// Version 1 Beta (2009-05-27)
//   -- Initial version
// Version 1.01 Beta (2009-05-27)
//   -- Flipped my title and innerHTML strings ... oops!
//
// ==UserScript==
// @name          Craigslist Jackass Flag
// @namespace     http://www.venutip.com/category/web-development/greasemonkey
// @description   Creates a new flag on Craigslist that allows you to (pretend that you can) flag the poster for being a jackass
// @version       1.01
// @include       *.craigslist.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Find the link to mark a post as spam/overpost and clone it
var cloned_spam_flag_link = $("#flag15").clone();

// Change the text. The tool flag maps to the spam/overpost flag.
cloned_spam_flag_link.attr("title", "poster is acting like a jackass");
cloned_spam_flag_link.attr("innerHTML", "<br />jackass<br />");
cloned_spam_flag_link.attr("id", "flag00");

// Insert the modified link after the spam/overpost flag
$("#flag15").after(cloned_spam_flag_link);