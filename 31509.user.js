// ==UserScript==
// @name           Model Mayhem bigger thumbs
// @namespace      http://userscripts.org/users/58147
// @description    changes _t to _m on thumb images
// @include        http://modelmayhem.com
// ==/UserScript==

(function() {
    var processThumbs = function() {
        var xpath = "//img[contains(@src,'_t.jpg')]";
        var res = document.evaluate(xpath, document, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var linkIndex, thumbtoLink;
        for (linkIndex = 0; linkIndex < res.snapshotLength; linkIndex++) {
            thumbLink = res.snapshotItem(linkIndex);
            thumbLink.src = thumbLink.src.replace(/_t\.jpg$/,"_m.jpg");
            thumbLink.removeAttribute('width');
            thumbLink.removeAttribute('height');
            thumbLink.removeAttribute('max-width');
            thumbLink.removeAttribute('max-height');
            thumbLink.style.removeProperty('width');
            thumbLink.style.removeProperty('height');
            thumbLink.style.removeProperty('max-width');
            thumbLink.style.removeProperty('max-height');
            thumbLink.parentNode.style.setProperty('height','auto','');
            thumbLink.parentNode.style.setProperty('width','auto','');
        }
    }
    window.addEventListener("load", processThumbs, false);
})();
