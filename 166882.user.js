// ==UserScript==
// @name        MSDN fallback to english page
// @namespace   http://www.sharkpp.net/
// @version     0.1
// @description fallback to english page from a suspicious japanese translation page in MSDN.
// @author      sharkpp
// @copyright   2012+, sharkpp
// @license     MIT License
// @include     http://msdn.microsoft.com/ja-jp/library/*
// ==/UserScript==

(function (){
    var items = document.evaluate('//*[@id="ContentFallback"]', document, null,
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (0 < items.snapshotLength) {
        location.href = location.href.replace(/ja-jp\//i, 'en-us/');
    }
})();
