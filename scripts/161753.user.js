// ==UserScript==
// @name        Remove ads on jsoneditoronline
// @include     http://www.jsoneditoronline.org/*
// @version     1.4
// ==/UserScript==
function removeAds() {
    // Remove ads
    var e = document.getElementById('ad');
    if (e) {
        e.parentNode.removeChild(e);
    }

    // Adjust widths
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
}
setInterval(removeAds, 1000);