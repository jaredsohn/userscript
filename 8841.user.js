// ==UserScript==
// @name           Woot-Off Helper
// @namespace      http://gotmarko.com/userscripts/
// @description    Auto reloads page and places percent left & item name in title
// @include        http://www.woot.com/
// @include        http://www.woot.com/Default.aspx
// ==/UserScript==

// v1 - 070426
//    first version
// v2 - 080508
//    updated for new title header name

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

itemTitle=document.getElementById('TitleHeader').firstChild.textContent;

progBar=xpath("//div[@id='ctl00_ContentPlaceHolder_ProgressPanel']/div[@class='bar']").snapshotItem(0);
if (progBar) {
    width = progBar.style.width;
    newTitle = "Woot: " + width + " " + itemTitle;
} else {
    newTitle = "Woot: GONE " + itemTitle;
}

document.title = newTitle;

setTimeout("document.location.reload();", 90000);
