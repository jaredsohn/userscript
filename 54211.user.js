// ==UserScript==
// @name           OkCupid Link Profiles Directly to Pictures on Home Page
// @namespace      http://userscripts.org/users/75356/
// @url            http://userscripts.org/scripts/source/54211.user.js
// @include        http://www.okcupid.com/home*
// ==/UserScript==

var links, a;

links = document.evaluate(
    "//a[contains(@href, '/profile/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    if (/\profile\/[^/]+$/.test(a.href)) {
        a.href += '/pictures';
    }
}
