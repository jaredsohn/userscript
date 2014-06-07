// ==UserScript==
// @name		Last.fm - Fire.fm Links
// @version		1.0b
// @namespace		none
// @description		Extension for Fire.fm users that replaces "lastfm://" with "firefm://station/".
// @author		s!n
// @contact		http://last.fm/user/-sin
// @licence		Creative Commons
// @include		http://www.last.fm*
// @include		http://www.lastfm.*
// @include		http://cn.last.fm*
// ==/UserScript==

var allLinks, thisLink;
xpath = '//a[contains(@href, "lastfm://")]';
allLinks = document.evaluate(xpath,document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.href = thisLink.href.replace(/^lastfm:\/\/globaltags\//,"firefm://station/tag/");
	thisLink.href = thisLink.href.replace(/^lastfm:\/\//,"firefm://station/");
}