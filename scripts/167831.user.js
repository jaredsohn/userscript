// ==UserScript==
// @name        imouto_show_deleted
// @namespace   null
// @include     https://yande.re/*
// @version     1
// @grant       none
// ==/UserScript==
var thumblist,thumb;
thumblist=document.evaluate(
	"//a[@class='thumb']",
	document.getElementById("post-list-posts"),
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for(var i=0;i<thumblist.snapshotLength;i++)
{
	thumblist.snapshotItem(i).target="_blank";
	if(thumblist.snapshotItem(i).childNodes[0].src=="https://yande.re/deleted-preview.png")
	{
		var md5=thumblist.snapshotItem(i).parentNode.nextSibling.href.replace(/^https:\/\/yande\.re\/image\/([0-9a-f]+)\/.+$/,"$1");
		thumblist.snapshotItem(i).childNodes[0].src="https://yande.re/data/preview/"+md5.slice(0,2)+"/"+md5.slice(2,4)+"/"+md5+".jpg";
	}
}
