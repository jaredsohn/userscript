// ==UserScript==
// @name           h2 redirection correction
// @namespace      http://twitter.com/kosugi
// @include        http://h2.hatena.ne.jp/r?location=*
// @description    correct target URL on h2 redirection page.
// ==/UserScript==

new function() {

    var node = document.evaluate('//a[@href=""]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (node) {
        node.singleNodeValue.href = decodeURIComponent(location.search.replace(/^.*?=/, ''));
    }
}
