// ==UserScript==
// @name           Search Jump -Bing
// @namespace      http://userscripts.org/users/86496
// @description    Jump to other engines in Bing.
// @include        http://*.bing.com/search?*
// ==/UserScript==

var key_tmp = document.getElementById("kw") || document.getElementsByName("q").item(0);
var keyword = encodeURI(key_tmp.getAttribute("value"));
var thistable = document.evaluate('/html/body/div[6]/div/div[2]/div[2]/div/div[2]/div/div/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var divElement = document.createElement("div");
var rightPosition = document.evaluate('//*[@id="results_area"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).offsetWidth;
divElement.className="more"
divElement.style.textAlign="right";
divElement.style.fontSize="11pt";
divElement.style.width=rightPosition;
divElement.innerHTML='跳到→ <a target="nw" href="http://www.youdao.com/search?q=' + keyword +'&amp;ue=utf8">【有道】</a>, <a target="nw" href="http://www.baidu.com/s?wd=' + keyword +'&amp;cl=3&amp;ie=utf-8">【百度】</a>, <a target="nw" href="http://www.google.com/search?q=' + keyword +'&ie=utf-8&oe=utf-8">【Google】</a>, <a target="nw" href="http://www.ask.com/web?q=' + keyword +'">【Ask】</a>'
thistable.parentNode.insertBefore(divElement, thistable);