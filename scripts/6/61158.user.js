// ==UserScript==
// @name          Remove "Became a Fan" Messages from Facebook Feeds
// @namespace     tag:scott.frey@gmail.com,2009:scottfrey
// @description   Remove "Became a Fan" Messages from Facebook Feeds
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==

function removeXpath() {
    var bNodes = document.evaluate("//h3[@class='GenericStory_Message GenericStory_Report'][contains(text(),'became')][contains(text(),'fan')]/parent::*/parent::*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var bLength = bNodes.snapshotLength;
    var i, bItem;
    for (i = 0; i < bLength; i++) {
        bItem = bNodes.snapshotItem(i);
        bItem.parentNode.removeChild(bItem);
    }
}

document.addEventListener("DOMNodeInserted", removeXpath, false);