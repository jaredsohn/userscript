// ==UserScript==
// @name          Remove "Attending" and "Attended" Messages from Facebook Feeds
// @namespace     tag:scott.frey@gmail.com,2009:scottfrey
// @description   Remove "Attending" and "Attended" Messages from Facebook Feeds
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==

function removeXpath() {
    var aNodes = document.evaluate("//h3[@class='GenericStory_Message GenericStory_Report'][contains(text(),'attend')]/parent::*/parent::*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var aLength = aNodes.snapshotLength;
    var i, aItem;
    for (i = 0; i < aLength; i++) {
        aItem = aNodes.snapshotItem(i);
        aItem.parentNode.removeChild(aItem);
    }
}

document.addEventListener("DOMNodeInserted", removeXpath, false);