// ==UserScript==
// @name pixivFix
// @namespace pixivFix
// @description This script fixes pixivFix's image links to avoid the direct link problem.
// @include *danbooru.donmai.us*
// @include *miezaru.donmai.us*
// ==/UserScript==

var allLinks, thisLink, picId;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	if(thisLink.href.lastIndexOf('pixiv.net/img/') >= 0){	
		picId = thisLink.href.substring(thisLink.href.lastIndexOf('/')+1,thisLink.href.lastIndexOf('.'));
		thisLink.href = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + picId;
	}
}
