// ==UserScript==
// @name           GoodReads sponsored books removal
// @namespace      tipmap.org
// @description    Removes the GoodReads "sponsored books" window
// @include        http://*.goodreads.com/*
// @include        https://*.goodreads.com/*
// ==/UserScript==

window.setTimeout(function() {var evilDiv, thisDiv;
evilDiv = document.evaluate("//div[@id='self_serve_ads']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < evilDiv.snapshotLength; i++) {
    thisDiv = evilDiv.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}
}, 0);