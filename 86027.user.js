// ==UserScript==
// @name           discuz 屏蔽id
// @namespace      
// @include        */viewthread.php*
// @include        */thread*
// @include        */redirect.php*
// ==/UserScript==
var bl = new Array("和谐", "紫云飞");

for (x in bl) {
	b = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + bl[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (b.snapshotLength) {
		for (var i = 0,c=""; i < b.snapshotLength; i++) {
		c = b.snapshotItem(i).firstChild.childNodes[3].textContent.replace(/\s*/g,"").slice(0,2);
		c = (Number(c) > 9)?c+"楼":c
			b.snapshotItem(i).innerHTML = "<center>被屏蔽帖子 " +c+" <font color=red>" + bl[x] + "</font></center>";
		}
	}
}