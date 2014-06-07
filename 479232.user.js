// ==UserScript==
// @name           TLF 水区贴过滤
// @namespace      http://userscripts.org/users/fking
// @description    按ID过滤TLF水区论坛
// @include        http://chat.eastgame.org/*
// @version        1.0
// ==/UserScript==

var threadsId = ["thread-126555"];

for (var i=0; i < threadsId.length; i++)
{
	var threads = '/html/body/div[3]/ul[@id="' + threadsId[i] + '"]/li';
	fnCheckGravePlus(threads, true);
}

function fnCheckGravePlus(xpath, flag){
	var linkTag;
	linkTag	= document.evaluate(
		xpath,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if (linkTag.snapshotItem(0)){
		var node = linkTag.snapshotItem(0);
		var nodeTitle =	node.children[0].innerHTML;

		for (var k=node.children.length-1; k >=	0; k--)
		{
			if (node.children[k].tagName !=	"STRONG")
				node.removeChild(node.children[k]);
		}
		var tips = document.createElement("span");
		tips.innerHTML = "[已屏蔽的主题]&nbsp;" + nodeTitle;
		tips.style.color = "dimgray";
		tips.style.fontStyle = "italic";
		node.insertBefore(tips,	node.firstChild);
	}
}
