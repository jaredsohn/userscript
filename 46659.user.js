// ==UserScript==
// @name           Search Jump -Google
// @namespace      http://userscripts.org/users/86496
// @description    Jump to other engines in Google.
// @include        http://www.google.com/search*
// ==/UserScript==

var keyword = encodeURI(document.getElementsByName('q')[0].value);
var thistable = document.evaluate('/HTML[1]/BODY[1]/DIV[5]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var divElement = document.createElement("div");
var rightPosition = document.evaluate('/html/body/div[5]/div[3]/div/ol/li', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).offsetWidth;
divElement.className = "more"
divElement.style.textAlign="right";
divElement.style.fontSize="12pt";
divElement.style.width=rightPosition;
divElement.innerHTML = '跳到→ <a target="nw" href="http://www.youdao.com/search?q=' + keyword +'&amp;ue=utf8">【有道】</a>, <a target="nw" href="http://www.baidu.com/s?wd=' + keyword +'&amp;cl=3&amp;ie=utf-8">【百度】</a>, <a target="nw" href="http://www.bing.com/search?q=' + keyword +'">【Bing】</a>, <a target="nw" href="http://www.ask.com/web?q=' + keyword +'">【Ask】</a>&nbsp;&nbsp;&nbsp;&nbsp;'
thistable.parentNode.insertBefore(divElement, thistable);