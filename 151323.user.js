// ==UserScript==
// @name           nijie-expand-diff-images
// @version        1.1
// @namespace      http://userscripts.org/users/438377
// @author         henge
// @description    「ニジエ」の差分画像を拡大する
// @include        http://nijie.info/view.php?id=*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/151323.meta.js
// ==/UserScript==

(function () {
    function handle(node) {
        var items = document.evaluate('.//div[@id="gallery"]/p/a/img', node, null, 7, null);
        for (var i = 0; i < items.snapshotLength; i++) {
            item = items.snapshotItem(i);
            src = item.src;
            item.src = src.replace('small_light(dh=120,q=90)/', '');
            item.style.maxWidth = "650px";
        }
    }

    document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (evt) {
        var node = evt.target;
        handle(node);
    }, false);
    handle(document);
})();
