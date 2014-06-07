// ==UserScript==
// @name           Search Jump -Youdao
// @namespace      http://userscripts.org/users/86496
// @description    Jump to other engines in Youdao web search.
// @include        http://www.youdao.com/*
// ==/UserScript==

var keyword = encodeURI(document.getElementById("query").value);
var thistable = document.evaluate('/HTML[1]/BODY[1]/DIV[2]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var divElement = document.createElement("div");
if (!thistable)
{
	thistable = document.evaluate('//*[@id="ew"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
	aligntable = document.evaluate('//*[@id="pt"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	rightPosition = aligntable.offsetWidth + aligntable.offsetLeft;
}
else
{
	rightPosition = document.evaluate('/html/body/div[2]/div[2]/ul/li', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).offsetWidth;
}
divElement.className="more"
divElement.style.textAlign="right";
divElement.style.fontSize="12pt";
divElement.style.width=rightPosition+'px';
divElement.innerHTML='跳到→ <a target="nw" href="http://www.google.com/search?q=' + keyword +'&ie=utf-8&oe=utf-8">【Google】</a>, <a target="nw" href="http://www.baidu.com/s?wd=' + keyword +'&amp;cl=3&amp;ie=utf-8">【百度】</a>, <a target="nw" href="http://www.bing.com/search?q=' + keyword +'">【Bing】</a>, <a target="nw" href="http://www.ask.com/web?q=' + keyword +'">【Ask】</a>&nbsp;&nbsp;&nbsp;&nbsp;'
thistable.parentNode.insertBefore(divElement, thistable);