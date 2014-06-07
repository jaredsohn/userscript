// GPForums Cleanup
// version 0.1
// 11-9-2008
// Copyright (c) 2008, Simon Potter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GPForums Cleanup
// @namespace     http://hazexp.googlepages.com/greasemonkey
// @description   Removes the headers and sidebar that exist on GPForums, works best with adblock installed.
// @include       http://www.gpforums.co.nz/*
// ==/UserScript==

sidebar = document.getElementById('forumlist_container');
netbar = document.getElementsByClassName('netbar');
masthead = document.getElementsByClassName('masthead');
pageFooter = document.getElementsByClassName('pageFooter');

sidebar.parentNode.removeChild(sidebar);

for (i = 0; i < netbar.length; i++) {
    var thisNetbar = netbar[i];
    thisNetbar.parentNode.removeChild(thisNetbar);    
}

for (i = 0; i < masthead.length; i++) {
    var thisMasthead = masthead[i];
    thisMasthead.parentNode.removeChild(thisMasthead);    
}

for (i = 0; i < pageFooter.length; i++) {
    var thisFooter = pageFooter[i];
    thisFooter.parentNode.removeChild(thisFooter);    
}
