// InsaneJournal Full User Info User Script
//
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name          InsaneJournal Full User Info
// @namespace     http://tearex.nfshost.com/gm/
// @description   Always link to the full IJ user info. Modification of Tom Kropf's script to work with InsaneJournal.
// (c)copyright   2007, Tom Kropf (http://userscripts.org/people/23412)
// @license       GPL; http://www.gnu.org/copyleft/gpl.html
// @attribution   Mysteriously Unknown (http://userscripts.org/scripts/show/586)
// @attribution   Tom Kropf (http://userscripts.org/scripts/show/8726)
// @author        Nox (http://userscripts.org/users/Nox)
// @source        http://userscripts.org/scripts/show/8726
// @include       http://*.insanejournal.com/*
// @include       http://insanejournal.com/*
// @version       0.0.1
// ==/UserScript==

// "AAARGHLBARGL," says Tweak.

var all, element, pitas;
var ljuserinfo = /^(?:http:\/\/www\.insanejournal\.com)?\/userinfo.bml\?user=([^&]+)/i;
var userdomain = /^http:\/\/([^\.]+)\.insanejournal\.com\/info/i;
var userpage = /^(?:http:\/\/www\.insanejournal\.com)?\/(?:users|community)\/([^\/]+)\/info/i;

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
      		element.setAttribute('href','http://www.insanejournal.com/userinfo.bml?user=' + pitas[1] + '&mode=full');
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
