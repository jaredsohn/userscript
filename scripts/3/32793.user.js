// ==UserScript==
// @name           DownJoyBBS ado
// @namespace      pto2k.blogspot.com
// @description    当乐论坛回帖加速器
// @include        http://*.d.tld/*
// ==/UserScript==
function xpathOne (query) {
	queryResult = document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return queryResult.snapshotItem(0);
}
function getKey(event){
	//var k = String.fromCharCode(event.which);	//代码转字符//n110 m109 b98 v118 p112 y121
	var k = event.which;
	//alert(k);
		if (k == "103"){//g
			ta.focus();
		}
}
ta=xpathOne("//textarea[@id='reply-form:message']")
inputBtn=xpathOne("//input[@id='reply-form:submit']")
inputBtn.tabIndex="5"
document.addEventListener('keypress',getKey,true);
//f=xpathOne("//form[@id='reply-form']")


