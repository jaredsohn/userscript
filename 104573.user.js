// ==UserScript==
// @name           LM
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Change redirect URL  into plain URL
// @include        http://linkomanija.net/*
// @include        http://www.linkomanija.net/*
// ==/UserScript==



var lianks = document.evaluate(
"//a[contains(@href, 'http://www.linkomanija.net/redir.php?url=http')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < lianks.snapshotLength; i++) {
var link = lianks.snapshotItem(i);
link.href = link.href.replace("http://www.linkomanija.net/redir.php?url=http","http")
}