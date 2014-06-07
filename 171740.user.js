// ==UserScript==
// @name       AdFreeAdCupid
// @namespace  http://www.kodewerx.org/
// @version    0.1
// @description  Disable the "AdFreeAd" on okcupid. Best used in conjunction with AdBlockPlus.
// @match      http://www.okcupid.com/*
// @copyright  2013, Jay Oster <jay@kodewerx.org>
// ==/UserScript==

(function () {
    setTimeout(function () {
        AdFreeAd.remove();
    }, 10);
})();