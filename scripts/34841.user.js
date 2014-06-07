// ==UserScript==
// @name          Stack Overflow: Hide Gravatar Image Alt Text
// @namespace     http://userscripts.org/
// @description   Hide the "gravatar image" alt text if the gravatar image is not found
// @include       http://stackoverflow.com/*
// ==/UserScript==

var images, img, alt, replacement;
images = document.evaluate(
    '//img[@alt]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < images.snapshotLength; i++) {
    img = images.snapshotItem(i);
    alt = img.alt.toUpperCase();
        if (alt == "GRAVATAR IMAGE") {
            replacement = document.createTextNode(""); //HIDE All of it
            img.parentNode.replaceChild(replacement, img);
        }
}

