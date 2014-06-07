
// 2008-05-16
// Copyright (c) 2008, Rich Armstrong
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
// select "Highlightable Case Numbers", and click Uninstall.
// 
// DISCLAIMER: The author of this script makes no representations as to its
// safety, utility, or security.  You use this script at your own risk.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Highlightable Case Numbers
// @namespace     http://www.fogcreek.com
// @description   Adds a SPAN that contains "Case" and the FogBugz case number, that auto-highlights on click.  Useful for relating cases without writing down the case number or trying to highlight a link on the page.
// @include       http://*.fogbugz.com/*
// ==/UserScript==


if (!unsafeWindow.goBug) return;
var bug_id = unsafeWindow.goBug.ixBug;

var el = unsafeWindow.elById("mainArea");
var elSpan = unsafeWindow.DOM.span();
elSpan.innerHTML = "<SPAN onClick='var sel = window.getSelection(); var range = document.createRange(); range.selectNodeContents(this);  sel.removeAllRanges(); sel.addRange(range);' >Case " + bug_id + "</SPAN>";
el.insertBefore(elSpan, el.firstChild);


return;

