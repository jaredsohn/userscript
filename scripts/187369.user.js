// ==UserScript==
// @id             CNKI-PDF
// @name           CNKI 中国知网 PDF 全文下载（支持非 Java 模式的北大 VPN）
// @version        1.2
// @namespace      http://yuelong.info
// @author         YUE Long
// @updateURL      https://userscripts.org/scripts/source/187369.meta.js
// @description    ① 点击 CNKI 检索结果界面中的下载按钮可以直接下载 PDF 格式文献；② 在硕士/博士学位论文详细信息界面添加“PDF下载”按钮；③ 支持非 Java 模式的北大 VPN。
// @include        http://*.cnki.net/*
// @include        http://*.cnki.net.*/*
// @include        https://vpn.pku.edu.cn/*
// @run-at         document-idle
// ==/UserScript==

var allLis, thisLi, newLi, aPDF, allLinks, thisLink, pageType;
pageType = true;

allLinks = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

allLis = document.evaluate(
    "//li[@class]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

if (allLis) {
	for (var i = 0; i < allLis.snapshotLength; i++) {
		thisLi = allLis.snapshotItem(i);
		if (thisLi.getAttribute("class").indexOf("readol") !== -1) {
			pageType = false;
			newLi = document.createElement('li');
			newLi.setAttribute("class","pdf");
			aPDF='<a target="_blank" href="' + thisLi.firstChild.href.replace("&dflag=readonline","&dflag=pdfdown") +'">PDF下载</a>';
			newLi.innerHTML=aPDF;
			thisLi.parentNode.insertBefore(newLi, thisLi.nextSibling);
		}
		if (thisLi.getAttribute("class").indexOf("cajNew") !== -1) {
			pageType = false;
		}
	}
}

if (pageType) {
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if (thisLink.href && thisLink.href.indexOf("download.aspx?filename=") != -1 && thisLink.href.indexOf("&dflag") == -1) {
		thisLink.href = thisLink.href + "&dflag=pdfdown";}
	}
};