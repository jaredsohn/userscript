// ==UserScript==
// @name          hateda_mgw
// @namespace     http://d.hatena.ne.jp/bluerabbit/
// @include       http://mgw.hatena.ne.jp/?*
// ==/UserScript==
(function() {
    window.location.href = document.evaluate('/html/body/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href;
})();