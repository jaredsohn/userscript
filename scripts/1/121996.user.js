// ==UserScript==
// @name		Jewish Singles - No JavaScript-Links
// @version		1.1.1
// @namespace		http://userscripts.org/scripts/show/121996
// @description Replaces JavaScript-Links with normal links
// @author		usrsrc
// @contact		http://userscripts.org/users/usrscr
// @licence		GPL
// @include		http://www.jewish-singles.de*
// ==/UserScript==

var allLinks, thisLink;
xpath = '//a[contains(@href, "javascript:popUpScrollWindow2")]';
allLinks = document.evaluate(xpath,document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.href = thisLink.href.replace(/^javascript\:popUpScrollWindow2\('(\S+)','(\S+)',(\S+),(\S+)\)/,"http://www.jewish-singles.de/$1");
}