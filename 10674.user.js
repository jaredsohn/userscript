// GrandCentral to Gmail
// version 0.1 
// 2007-07-15
// Copyright (c) 2007, Zach Holmquist
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
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GrandCentral New Message Count to Gmail Sidebar 
// @namespace     http://www.userscripts.org
// @description   Load Grand Central New Message Count to Gmail Inbox
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

if (document.location.hostname == 'mail.google.com') {
   var cl = /NEW+/g;
   setLink();   
}

function setLink() {
	var leftNav = document.getElementById('cont');
	if(leftNav) {
		var link = document.createElement('div');
		link.className = 'nl';
		link.innerHTML = '<span id="grandcentralLink" class="lk"><b>Voicemail <span id="GCount"></span></b></span><br>';
   
		var leftNav = document.getElementById('cont');
		leftNav.parentNode.parentNode.insertBefore(link, leftNav.parentNode);

		link.addEventListener('click', goToGC, false);
		getMessages();
	}
}


function getMessages() {
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.grandcentral.com/messages/new',
    onload: function(results) {
        page = results.responseText;
        if ( cl.test(page) ) {
	num = page.match(cl);
	num = num.length
	document.getElementById('GCount').innerHTML = '('+ (num - 1) +')';
        }
    }
});
}

function goToGC() {
location.href = 'http://www.grandcentral.com';
}


    