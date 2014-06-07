// ==UserScript==
// @name           Shortnews.de adf.ly removal 
// @version        1.1
// @namespace      
// @author         StyleYX
// @description    Removes adf.ly from all links on shortnews
// @include        http*://*.shortnews.de/id/*
// @run-at         window-load
// ==/UserScript==

(function () {
var links,thisLink;
links = document.evaluate("//a[contains(@href,'goto.cfm')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);
    var x_href = thisLink.href;
    var o = x_href.indexOf("link")+5;
    var f = x_href.substring(o);
    var url = decodeURIComponent(f.replace(/\+/g,  " "));
    thisLink.href = url;
}
})();