// ==UserScript==
// @name           Remove Ad Banner From AnchorFree VPN
// @namespace      
// @description    Removes AnchorFree VPN's Ad banner from every page.
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      xiaolai, http://www.xiaolai.net
// @version        0.1
// @license        Free
// ==/UserScript==

nodes = document.evaluate("//div", document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < nodes.snapshotLength; i++) {
    thisLink = nodes.snapshotItem(i);
    if(thisLink.className.indexOf('AF') == 0)
        thisLink.parentNode.removeChild(thisLink);
}

var css = "html {margin-top:0px !important;}";
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.innerHTML = css;
        heads[0].appendChild(node);
    }
}
