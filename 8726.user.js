// LiveJournal Full User Info User Script
// 2007-04-22
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
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
// select "LiveJournal Full User Info", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LiveJournal Full User Info
// @namespace     http://swanky.de/greasemonkey/
// @description   Always link to the full LJ user info. Rewrite of Mysteriously Unknown's script to work with LiveJournal's current profile scheme.
// @source        http://userscripts.org/scripts/show/8726
// @include       http://*.livejournal.com/*
// @include       http://livejournal.com/*
// @version       0.0.1
// ==/UserScript==

// "Baaaah," says Frank.

var all, element, pitas;
var ljuserinfo = /^(?:http:\/\/www\.livejournal\.com)?\/userinfo.bml\?user=([^&]+)/i;
var userdomain = /^http:\/\/([^\.]+)\.livejournal\.com\/info/i;
var userpage = /^(?:http:\/\/www\.livejournal\.com)?\/(?:users|community)\/([^\/]+)\/info/i;

all = document.getElementsByTagName('a');

for (i=0; i < all.length; i++) {
	element = all[i];
        pitas = ljuserinfo.exec(element.getAttribute('href'));
    	if (pitas == null) {
      		pitas = userdomain.exec(element.getAttribute('href'));
    		}
    	if (pitas == null) {
      		pitas = userpage.exec(element.getAttribute('href'));
    		}
    	if (pitas != null) {
      		element.setAttribute('href','http://www.livejournal.com/userinfo.bml?user=' + pitas[1] + '&mode=full');
    		}
        if (element.href.indexOf('/profile/') != -1) {
        	element.href = element.href.replace ('/profile/', '/profile?mode=full');
	        }
        else {
                if (element.href.indexOf('/profile') != -1) {
        	        element.href += '?mode=full';
	                }
                }
}

// 0.0.1	Initial release.