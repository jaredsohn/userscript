// ==UserScript==
// @id             THU-SFX
// @name           阻止清华大学 SFX 系统无效弹窗
// @version        1.0
// @namespace      http://yuelong.info
// @author         YUE Long
// @updateURL      https://userscripts.org/scripts/source/162755.meta.js
// @description    阻止清华大学图书馆 SFX 系统查找文献原文时弹出毫无意义的只显示1px "transparentpixel.png" 图像的新窗口。
// @include        http://sfx.lib.tsinghua.edu.cn/*
// @version 1.0
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if (thisLink.href.indexOf("openWin(this);") != -1) {
			thisLink.href=thisLink.href.replace("openWin(this);","");
	}
}