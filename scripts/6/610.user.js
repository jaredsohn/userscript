// LJ Fixform 1.01
// Copyright (c) 2005, David Perry
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// LiveJournal has 100-character internal limits on the "currents"
// (mood and music, see this URL: 
//   http://www.livejournal.com/support/faqbrowse.bml?faqid=148 )
// However, the web-based forms have shorter limits, for some reason.
// This just bumps up the limit on the two form fields in question
// to the allowable maximum, and makes them a bit bigger so you can
// see more of what you're entering in all that space.
//
// WARNING!  If you edit a post, the contents of those fields will
// be clipped to the shortened length.  Make sure you fill them out
// again before you save the entry.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
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
// @name          LJ Fixform
// @description   Loosens the restrictions on LiveJournal's form inputs
// @include       http://www.livejournal.com/update.bml*
// @include       http://www.livejournal.com/editjournal.bml*
// ==/UserScript==

var f=(document.updateForm?document.updateForm:document.forms[0]);
f.prop_current_mood.setAttribute("size","30");
f.prop_current_mood.setAttribute("maxlength","100");
f.prop_current_music.setAttribute("size","80");
f.prop_current_music.setAttribute("maxlength","100");
