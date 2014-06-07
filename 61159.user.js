// ==UserScript==
// @name          Remove "Joined the Group" Messages from Facebook Feeds
// @namespace     tag:scott.frey@gmail.com,2009:scottfrey
// @description   Remove "Joined the Group" Messages from Facebook Feeds
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==

function removeXpath() {
    var gNodes = document.evaluate("//h3[@class='GenericStory_Message GenericStory_Report'][contains(text(),'joined')][contains(text(),'group')]/parent::*/parent::*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var gLength = gNodes.snapshotLength;
    var i, gItem;
    for (i = 0; i < gLength; i++) {
        gItem = gNodes.snapshotItem(i);
        gItem.parentNode.removeChild(gItem);
    }
}

document.addEventListener("DOMNodeInserted", removeXpath, false);