// ==UserScript==
// @name          Remove "Now Friends" Messages from Facebook Feeds
// @namespace     tag:scott.frey@gmail.com,2009:scottfrey
// @description   Remove "Now Friends" Messages from Facebook Feeds
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==

function removeXpath() {
    var fNodes = document.evaluate("//h3[@class='GenericStory_Message GenericStory_Report'][contains(.,'now friends')]/parent::*/parent::*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var fLength = fNodes.snapshotLength;
    var i, fItem;
    for (i = 0; i < fLength; i++) {
        fItem = fNodes.snapshotItem(i);
        fItem.parentNode.removeChild(fItem);
    }
}

document.addEventListener("DOMNodeInserted", removeXpath, false);