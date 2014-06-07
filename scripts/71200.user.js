// ==UserScript==
// @author       Paulo Freitas <paulofreitas@canaldev.com.br>
// @name         IP.Board Admin: Pretty Checkboxes
// @namespace    http://userscripts.org/users/paulofreitas
// @description  Beautifies checkboxes to turn them easier "readable"
// @version      20100404
// @license      http://www.mozilla.org/MPL/MPL-1.1.html
// @include      http://*/index.php?adsess=*&app=members&module=groups&section=permissions&do=edit_set_form&id=*
// @include      http://*/index.php?adsess=*&app=forums&module=forums&section=forums&do=edit&f=*
// @include      http://*/index.php?adsess=*&app=forums&&module=forums&section=forums&&do=pedit&f=*
// @include      http://*/index.php?adsess=*&app=forums&module=forums&section=forums&module=forums&do=forum_add&forum_id=&type=category
// @include      http://*/index.php?adsess=*&app=forums&module=forums&section=forums&module=forums&do=forum_add&forum_id=&type=forum
// ==/UserScript==
var beautify = function (box) {
    box.parentNode.style.backgroundColor = (box.checked) ? '#e3f6e5' : '#f6e3e3';
};
var observe = function () {
    var boxes = document.evaluate('//input[@type="checkbox"]', document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var box, i = 0; i < boxes.snapshotLength; i++) {
        box = boxes.snapshotItem(i);
        box.addEventListener('click', function (e) {
            beautify(this);
        }, false);
        beautify(box);
    }
};
(function () {
    observe();

    var items = document.evaluate('//input[@type="button"]|//input[@type="checkbox"]|//td[@class="perm"]|//td[@class="perm column"]',
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var item, i = 0; i < items.snapshotLength; i++) {
        item = items.snapshotItem(i);
        item.addEventListener('click', function (e) {
            setTimeout(observe, 0); // workaround =|
        }, false);
    }
})();
