// ==UserScript==
// @name           blueidea
// @namespace      http://bbs.blueidea.com
// @description    use head image in blueidea
// @include        http://bbs.blueidea.com/*
// ==/UserScript==
function xpath(query) {
return document.evaluate(query, document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
dest_href = xpath("//a[@href='space-uid-182221.html']/parent::*/child::img");
for(var i = 0 ; i < dest_href.snapshotLength ; i++){
dest_img = dest_href.snapshotItem(i);
dest_img.src = "http://healdream.googlepages.com/enjoy-life.gif";
}
//console.log(dest_href.snapshotItem(0));
//dest_img = xpath('//img[@src="customavatars/user.gif"]',dest_href.snapshotItem(1).parentNode);
//console.log(dest_img.snapshotItem(0));
//console.log(document.getElementById('my'));