// ==UserScript==
// @name           No Feed Comment
// @namespace      http://www.ie.tsinghua.edu.cn
// @description    Stop feeding comment at xiaonei.com
// @include        http://*.renren.com/*
// ==/UserScript==

var allElements, thisElement;
allElements = document.evaluate(
    '//*[@name]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    if (thisElement.name == 'feedComment') {
    	thisElement.click();
    }
}


