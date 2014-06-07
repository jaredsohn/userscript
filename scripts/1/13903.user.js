// ==UserScript==
// @name          twitter @ auto link
// @include       http://twitter.com/*
// ==/UserScript==
var snap = document.evaluate("//*[@class='entry-title entry-content']",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var regex = /@(\w*)/g;
for (var i = 0; i < snap.snapshotLength; i++) {
    var content = snap.snapshotItem(i);
    var text = content.innerHTML;
    if (text.indexOf("@") < 0) {
        continue;
    }
    content.innerHTML = text.replace(regex, "@<a href=\"http://twitter.com/$1\">$1</a>");
}
