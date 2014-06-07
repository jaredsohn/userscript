// ==UserScript==
// @name        Fix Medium external links
// @author      George Pop
// @date        2013-05-24
// @namespace   gp
// @description Medium (medium.com) detours external links to a redirect page, forcing readers to perform one extra action and possibly logging their visits to external pages. This script restores the original URL for external links.
// @include     https://medium.com/*
// @version     1
// ==/UserScript==

function main() {
    var links = document.evaluate('//a[starts-with(@href, "' + r_base + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (links.snapshotLength) {
        for (var i = 0; i < links.snapshotLength; i++) {
            var ext_url = decodeURIComponent(links.snapshotItem(i).href.substring(r_base.length));
            links.snapshotItem(i).href = ext_url;
        }
    }
}

var r_base = 'https://medium.com/r/?url=';
window.addEventListener('load', main);
