// Copyright (c) 2005, Erik Taraldsen <eriktar@gmail.com>
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
// --------------------------------------------------------------------
// 
// When having multiple tabs open, it is anoying to have the same 
// preamble visible on every tab.  This GM scripts removes the preamble
// in the title of many sites
//
// TODO:
// -Fix LowerCase problem
// -Add some version information
//
// DONE:
// -remove preamble for sites with none www title (orkutbar.mozdev.org)
//    +Perhaps an split would be a good solution?
// 
// 
// ==UserScript==
// @name          Head shrink
// @namespace     http://www.hinsiden.net/GMScript/
// @description   Removes preamble in the title on many sites
// @include       *
// ==/UserScript==

var t = document.title.toLowerCase();
var d = document.domain.toLowerCase();
var dd = d.split(".");

//GM_log(dd[0]);
t = t.replace(d,'');
d = d.replace(dd[0]+'.','');
t = t.replace(d,'');
t = t.replace(/^[\ \:\-\|\.]+/,'');
document.title= t;
