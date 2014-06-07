// ==UserScript==
// @name           Replace Text On Webpages
// @namespace      http://userscripts.org/users/23652
// @description    Replaces text on websites. Now supports wildcards in search queries. Won't replace text in certain tags like links and code blocks
// @include        http://*
// @include        https://*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons
// @version        1.0.51
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==

var domainname = 'style="width: 900px; height: 500px;';
var ipaddress = 'style="width: 100%; height: 100%;';
var allImgs, thisImg;
allImgs = document.evaluate(
'//*',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allImgs.snapshotLength; i++) {
thisImg = allImgs.snapshotItem(i);
if (thisImg.src.match(domainname)) {
thisImg.src = thisImg.src.replace(domainname, ipaddress);
}
}