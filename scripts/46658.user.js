// ==UserScript==
// @name           Search Jump -Baidu
// @namespace      http://userscripts.org/users/86496
// @description    Jump to other engines in Baidu web search.
// @include        http://www.baidu.com/*
// ==/UserScript==

var key_tmp = document.getElementById("kw") || document.getElementsByName("wd").item(0);
var keyword = encodeURI(key_tmp.getAttribute("value"));
var thistable = document.body.getElementsByTagName("table")[3];
var divElement = document.createElement("div");
var rightPosition = document.evaluate('/html/body/table[4]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).offsetWidth;
divElement.className="more";
divElement.style.textAlign="right";
divElement.style.width=rightPosition;
divElement.innerHTML='跳到→ <a target="nw" href="http://www.youdao.com/search?q=' + keyword +'&amp;ue=utf8">【有道】</a>, <a target="nw" href="http://www.google.com/search?q=' + keyword +'&ie=utf-8&oe=utf-8">【Google】</a>, <a target="nw" href="http://www.bing.com/search?q=' + keyword +'">【Bing】</a>, <a target="nw" href="http://www.ask.com/web?q=' + keyword +'">【Ask】</a>&nbsp;&nbsp;&nbsp;&nbsp;';
thistable.parentNode.insertBefore(divElement, thistable);