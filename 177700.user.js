/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           Preferred Gender Pronouns for Facebook (PGPs-FB)
// @version        0.1.1
// @namespace      com.maybemaimed.facebook.pgps
// @updateURL      https://userscripts.org/scripts/source/177700.user.js
// @description    Teaches Facebook to use your friends' preferred gender pronouns in your news feed and notifications. To work, your friends must have first entered their PGPs in the Preferred Gender Pronouns for Facebook application at https://apps.facebook.com/gender-pronouns
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://apps.facebook.com/*
// @include        http://apps.facebook.com/*
// @exclude        https://www.facebook.com/ajax*
// @exclude        http://www.facebook.com/ajax*
// @exclude        https://www.facebook.com/ai.php*
// @exclude        http://www.facebook.com/ai.php*
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==
PGPS_FB = {};
PGPS_FB.CONFIG = {
    'debug': false, // switch to true to debug
    'api_url': 'https://glacial-coast-4618.herokuapp.com/api.php?id='
}
PGPS_FB.users = [];
/**
 * Queries the PGPs-FB server for pronouns by user ID. If a pronoun result is
 * found, updates the HTML node appropriately.
 *
 * @param id The numeric Facebook User ID to query.
 * @param el The HTML node from which the ID was scraped.
 */
PGPS_FB.getUserPgps = function (id, el) {
    if (!id) { PGPS_FB.log('Invalid ID passed to getUserPgps().'); return false; }
    if (PGPS_FB.users[id]) {
        return PGPS_FB.users[id];
    }
    PGPS_FB.log('About to query pronouns for user ' + id.toString());
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': PGPS_FB.CONFIG.api_url + id.toString(),
        'onload': function (response) {
            PGPS_FB.users[id] = JSON.parse(response.responseText);
            PGPS_FB.log('Retrieved PGPs for ' + id.toString() + ': ' + response.responseText);
            if (PGPS_FB.users[id].possesive) {
                PGPS_FB.log('Got result for possesive pronoun "' + PGPS_FB.users[id].possesive + '" for user ID ' + id.toString());
                PGPS_FB.updatePronounTextInElement(el, PGPS_FB.users[id].possesive);
            }
        }
    });
};
PGPS_FB.updatePronounTextInElement = function (el, pronoun) {
    // If this is a TEXT_NODE, this can't have children.
    if (3 === el.nodeType) {
        // Only replace if we're not already using the correct pronoun.
        if (-1 == el.textContent.indexOf(pronoun)) {
            PGPS_FB.log('Replacing pronoun in text node "' + el.textContent + '" with ' + pronoun + '.');
            el.textContent = el.textContent.replace(/\bher\b|\bhis\b|\btheir\b/, pronoun);
        }
    } else {
        for (var i = 0; i < el.childNodes.length; i++) {
            PGPS_FB.updatePronounTextInElement(el.childNodes[i], pronoun); // recurse
        }
    }
};

// Utility debugging function.
PGPS_FB.log = function (msg) {
    if (!PGPS_FB.CONFIG.debug) { return; }
    GM_log('PGPs for Facebook: ' + msg);
};

// Initializations.
GM_addStyle('\
');
PGPS_FB.init = function () {
    var MutationObserver = unsafeWindow.MutationObserver || unsafeWindow.WebKitMutationObserver;
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // Re-run the main() function when new nodes are added.
            if (mutation.addedNodes) {
                PGPS_FB.main();
            }
        });
    });
    var el = document.getElementById('contentCol');
    observer.observe(el, {
        'childList': true,
        'subtree': true
    });
    PGPS_FB.main();
};
window.addEventListener('DOMContentLoaded', PGPS_FB.init);

// This is the main() function, executed on page load.
PGPS_FB.main = function () {
    PGPS_FB.log('Starting main() on page ' + unsafeWindow.location.toString());
    // Find all instances where Facebook uses pronouns on this page.
    // TODO: This only covers the "stream" info, not timelines, etc. Fix.
    var els = document.querySelectorAll('.uiStreamMessage.uiStreamHeadline.uiStreamPassive');
    var targets = [];
    for (var i = 0; i < els.length; i++) {
        if (els[i].textContent.match(/\bher\b|\bhis\b|\btheir\b/)) {
            targets.push(els[i]);
        }
    }
    // For each of these instances, get the numeric Facebook ID of the user.
    var ids = [];
    for (var i = 0; i < targets.length; i++) {
        // Grab user ID data from hovercard
        var hovercard = targets[i].querySelector('.passiveName').getAttribute('data-hovercard');
        if (hovercard) {
            var id = hovercard.match(/\d+$/)[0];
        } else {
            // or, if that's not available,
            // extract it from the nearby avatar image.
            var id = targets[i].parentNode.parentNode.parentNode.previousSibling
                     .getAttribute('src').match(/\d+_(\d+)_\d+/)[1];
        }
        ids.push(id);
        // For each user ID found, check to see if they've got PGPs we can use.
        PGPS_FB.getUserPgps(ids[i], targets[i]);
    }
};
