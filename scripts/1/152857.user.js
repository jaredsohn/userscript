/**
 *
 * This is a Greasemonkey script and must be run using Greasemonkey 1.0 or newer.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           FetLife Kinky & Popular Filter
// @version        0.1
// @namespace      com.maybemaimed.fetlife.kpfilter
// @updateURL      https://userscripts.org/scripts/source/152857.user.js
// @description    Filters out all writings from FetLife's Kinky & Popular page.
// @include        https://fetlife.com/explore*
// @grant          GM_log
// ==/UserScript==
FL_KP = {};
FL_KP.CONFIG = {
    'debug': false, // switch to true to debug.
};

// Utility debugging function.
FL_KP.log = function (msg) {
    if (!FL_KP.CONFIG.debug) { return; }
    GM_log('FETLIFE FL_KP: ' + msg);
};

// Initializations.
var uw = (unsafeWindow) ? unsafeWindow : window ; // Help with Chrome compatibility?
FL_KP.init = function () {
    FL_KP.main();
};
window.addEventListener('DOMContentLoaded', FL_KP.init);

// This is the main() function, executed on page load.
FL_KP.main = function () {
    // Test to determine whether K&P has loaded.
    // If it has,
    // remove all "writings".

    var x = document.querySelectorAll('div[id^="post_"]');
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
};