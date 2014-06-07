// ==UserScript==
// @name           Xanga Header Space Remover
// @namespace      Brad Campbell, tvguy05.blogspot.com
// @description    Removes the space above the header
// @include        http://www.xanga.com/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var theDiv = xpath('//div[@style="height: 130px;"]').snapshotItem(0);

theDiv.style.display = "none";

