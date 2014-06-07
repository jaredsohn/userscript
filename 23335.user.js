// DMOZ OffSite Blank
// version 0.1
// 2008-02-28
// Copyright (c) 2005, Mark Pilgrim and Otto de Voogd
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// This script is adaptation of the user script "OffSite Blank version 0.6"
// by Mark Pilgrim - http://diveintomark.org/projects/greasemonkey/
// The adaptation is minimal and is to apply the script only to dmoz.org
//
// Original user script:
// http://diveintomark.org/projects/greasemonkey/offsiteblank.user.js
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
// select "DMOZ Offsite Blank", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DMOZ Offsite Blank
// @namespace     http://www.7is7.com/
// @description   force offsite links on DMOZ to open in a new window
// @include       http://dmoz.org/*
// @include       http://*.dmoz.org/*
// ==/UserScript==

var a, thisdomain, links;
thisdomain = window.location.host;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
    if (a.host && a.host != thisdomain) {
	a.target = "_blank";
    }
}

// TIAF!
