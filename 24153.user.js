// ==UserScript==
// @name           Stay Where You Are
// @namespace      http://pto2k.blogspot.com
// @description    一些白痴网站喜欢把所有链接都在新窗口打开
// @include        http://*.soufun.com/*
// ==/UserScript==

/* 用xpath查对象 返回全部*/
var xpathAll = function(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
/*不准链接在新窗口打开*/
var outLinks, thisLink;
outLinks = xpathAll("//a[@target='_blank']");
if(outLinks){
	for (var i = 0; i < outLinks.snapshotLength; i++) {
		thisLink = outLinks.snapshotItem(i);
		thisLink.target="_top";
	}
}