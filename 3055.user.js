// Yahoo! Mail Attachment Download Link
// version 0.2 ALPHA
// 2007-09-04
// Copyright (c) 2007, Prakash Kailasa <pk-moz at kailasa dot net>
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
// To uninstall, go to Tools -> Manage User Scripts,
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo! Mail attachment download link
// @namespace     http://kailasa.net/prakash/greasemonkey
// @include       http://*.mail.yahoo.com/ym/showLetter?*
// @description	  Add a direct link to download attachment on the message page
// ==/UserScript==

// GM_log('Yahoo! Mail attachment download link');

// are there any attachments in this message?
var att_link = document.evaluate('//a[@name="attachments"]', document, null,
				 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (att_link.snapshotLength < 1) {	// no attachments
    // GM_log('No attachments in this message');
    return;
}

var location = document.location;
var matches = document.location.search.match(/YY=(\d+)/);
var yy = matches[1];

// find 'Save to Computer' links for attachments
var save_links = document.evaluate('//a[contains(@href, "VScan=1")]',
				   document,
				   null,
				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				   null);
// GM_log('# of attachments = ' + save_links.snapshotLength);

for (var i = 0; i < save_links.snapshotLength; i++) {
    var save_link = save_links.snapshotItem(i);
    if (save_link.firstChild.tagName == 'IMG') {	// do it just once
	// GM_log('save_link = ' + save_link.href);
	var download_url = save_link.href
	    		   .replace(/ym\/ShowLetter/, 'ya/download')
	    		   .replace(/YY=\d+/, 'YY=' + yy)
			   .replace(/VScan=1/, "download=1");
	// GM_log('download_link = ' + download_url);
	var download_link = document.createElement('a');
	download_link.href = download_url;
	download_link.appendChild(document.createTextNode('Download'));
	save_link.parentNode.appendChild(document.createTextNode(' - '));
	save_link.parentNode.appendChild(download_link);
    }
}
