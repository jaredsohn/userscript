// ==UserScript==
// @name           Facebook Feed cleaner
// @namespace      dave mason
// @description    Cleans the facebook feed of unwanted entries
// @include        http://www.facebook.com/*

function removeXpath() {
    var alltags = document.evaluate("//h3[@class='GenericStory_Message GenericStory_Report'][not(contains(text(),'tagged'))]/parent::*/parent::*",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0; i<alltags.snapshotLength; i++) {
        element = alltags.snapshotItem(i);
        element.parentNode.removeChild(element);
    }
}

document.addEventListener("DOMNodeInserted", removeXpath, false);
// ==/UserScript==