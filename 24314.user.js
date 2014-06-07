// Vox MP3 Linker
// version 0.1
// 2008-03-24
// Copyright (c) 2008, Ross Goldberg
// Please direct comments/questions to rossruns@gmail.com
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
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF VOX MP3 LINKER 
// go to Tools/Manage User Scripts and manually uninstall the 
// previous version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Vox MP3 Linker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Provides a direct link to the mp3 on the URL of a given Vox-hosted
// mp3 song.  This script is intended to let users play the mp3 in an 
// alternative media-player plugin for their browser (as opposed to the 
// flash-based plugin provided by Vox).  This script should not be used 
// to illegally download mp3 files.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Vox MP3 Linker
// @namespace       http://rossotron.com/tag/greasemonkey/
// @description     Provides a direct link to the mp3 on the URL of a given Vox-hosted mp3 song.  This script is intended to let users play the mp3 in an alternative media-player plugin for their browser (as opposed to the flash-based plugin provided by Vox).  This script should not be used to illegally download mp3 files.
// @include         http://*vox.com/library/audio/*
// ==/UserScript==

// Get the URL for the mp3
regexString = ".+audio/(.{34}).+";
regex = RegExp(regexString);
results = regex.exec(window.location.href);
if (results == null)
{
	alert("Cannot find link to mp3 file.  If this problem persists, please contact the script author at rossruns@gmail.com .");
}
else
{
	URL_snippet = results[1];
}



// Get the mp3 div to insert the link just below
mp3_asset_list = document.evaluate(
	"//div[@class='asset-inner']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

mp3_asset = mp3_asset_list.snapshotItem(0);


// Insert the new link for the mp3 to download
var mp3link = document.createElement("a");
mp3url = "http://a3.vox.com/download/" + URL_snippet + "-pi.mp3";
mp3link.href = mp3url;
mp3link.title = 'Link to mp3 file';
mp3link.innerHTML = 'Link to mp3 file';
mp3_asset.parentNode.insertBefore(mp3link, mp3_asset.nextSibling);


/*
TODO:
- Rename file in save-as dialog?

0.1 - 2008-03-24 - Initial release
*/

// END FILE	