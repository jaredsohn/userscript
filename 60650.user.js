// ==UserScript==
// @name          Remove "Attending," "Attended," "Became Fan," "Joined Group," and "Now Friends" Messages from Facebook Feeds
// @namespace     tag:scott.frey@gmail.com,2009:scottfrey
// @description   Remove "Attending," "Attended," "Became Fan," "Joined Group," and "Now Friends" Messages from Facebook Feeds
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==

function removeXpath() {
    var genNodes = document.evaluate("//h3[@class='GenericStory_Message GenericStory_Report'][not(contains(text(),'tagged'))]/parent::*/parent::*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var genLength = genNodes.snapshotLength;
    var i, genItem;
    for (i = 0; i < genLength; i++) {
        genItem = genNodes.snapshotItem(i);
        genItem.parentNode.removeChild(genItem);
    }
}

document.addEventListener("DOMNodeInserted", removeXpath, false);