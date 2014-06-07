// Written by Brian Pilnick
// 9/28/2007
//
// ==UserScript==
// @name           This American Life MP3 Linker
// @namespace      http://pilnick.com
// @description    Changes the streaming link on the archive page to link directly to the MP3 for download.
// @include        http://www.thisamericanlife.org/Radio_Archive.aspx
// @include        http://thisamericanlife.org/Radio_Archive.aspx
// ==/UserScript==

var allLinks, thisLink;

allLinks = document.evaluate('//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	if 	(thisLink.href.match(/javascript:playMe/)) {
		thisLink.href = thisLink.href.replace(/javascript:playMe\(/, 'http://audio.thisamericanlife.org/jomamashouse/ismymamashouse/');
		thisLink.href = thisLink.href.replace(/\)\;/, '.mp3');
	}
}