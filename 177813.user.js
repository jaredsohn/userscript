/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           Predator Alert Tool for Facebook (PAT-Facebook)
// @version        0.1.2
// @namespace      com.maybemaimed.facebook.predator-alert-tool
// @updateURL      https://userscripts.org/scripts/source/177813.user.js
// @description    Alerts you of people who have allegedly violated other people's consent as you browse Facebook.
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://apps.facebook.com/*
// @include        http://apps.facebook.com/*
// @include        https://predator-alert-tool.herokuapp.com/*
// @exclude        https://www.facebook.com/ajax*
// @exclude        http://www.facebook.com/ajax*
// @exclude        https://www.facebook.com/ai.php*
// @exclude        http://www.facebook.com/ai.php*
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==
PAT_FB = {};
PAT_FB.CONFIG = {
    'debug': false, // switch to true to debug.
    'api_url': 'https://predator-alert-tool.herokuapp.com/api.php?fbid='
};

// Utility debugging function.
PAT_FB.log = function (msg) {
    if (!PAT_FB.CONFIG.debug) { return; }
    GM_log('PAT-Facebook: ' + msg);
};
// Utility function to read cookie values.
function getCookie (n) {
    try {
        return unescape(document.cookie.match('(^|;)?'+n+'=([^;]*)(;|$)')[2]);
    } catch (e) {
        return null;
    }
}
PAT_FB.getUserID = function () {
    try {
        return unsafeWindow.Env.user
    } catch (e) {
        return getCookie('c_user');
    }
};

// Initializations.
GM_addStyle('\
');
PAT_FB.current_user = null; // Who are we?
PAT_FB.init = function () {
    // We need to capture the session cookies from the PAT-FB server, so if we
    // loaded the server's pages, save the cookies locally for later use.
    // TODO: But, um, this functionality really starts requiring a browser ext.
    if (unsafeWindow.location.host == PAT_FB.parseApiUrl().host) {
        GM_setValue('pat_fb_cookies', document.cookie);
    }
    PAT_FB.current_user = PAT_FB.getUserID();
    var MutationObserver = unsafeWindow.MutationObserver || unsafeWindow.WebKitMutationObserver;
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    // Skip text nodes.
                    if (mutation.addedNodes[i].nodeType == Node.TEXT_NODE) { continue; }

                    // If the new node is a hovercard
                    var ownerid = mutation.addedNodes[i].getAttribute('data-ownerid');
                    var num_pat;
                    // and this hovercard has any PAT data, grab that data
                    if (ownerid && (num_pat = document.getElementById(ownerid).getAttribute('data-num-pat-reports'))) {
                        // and insert it into the hovercard HTML.
                        var a = document.createElement('a');
                        a.setAttribute('href',
                            PAT_FB.parseApiUrl().protocol + '//' + PAT_FB.parseApiUrl().host
                            + '/reports.php?action=lookup&reportee_id='
                            + document.getElementById(ownerid).getAttribute('data-pat-reportee-id')
                        );
                        a.setAttribute('class', 'pat-reports-link');
                        a.innerHTML = 'View ' + num_pat + ' PAT-FB stories';
                        // Don't append a duplicate link if we're re-processing this node.
                        // TODO: Uhm, yeah, why don't we just not re-process it multiple times?
                        if (!mutation.addedNodes[i].querySelector('.pat-reports-link')) {
                            mutation.addedNodes[i].querySelectorAll('table td')[1].appendChild(a);
                        }
                    }
                    // Process all the rest.
                    PAT_FB.main(mutation.addedNodes[i]);
                }
            }
        });
    });
    var el = document.body;
    observer.observe(el, {
        'childList': true,
        'subtree': true
    });
    PAT_FB.main(document);
};
window.addEventListener('DOMContentLoaded', PAT_FB.init);

// main() is given a start node (HTML tree) and processes appropriately.
PAT_FB.main = function (node) {
    PAT_FB.log('Starting main() on page ' + unsafeWindow.location.toString());
    var els = node.querySelectorAll('[data-hovercard]');
    for (var i = 0; i < els.length; i++) {
        var fbid = els[i].getAttribute('data-hovercard').match(/id=(\d+)/)[1];
        PAT_FB.log('Found Facebook ID ' + fbid + '.');
        PAT_FB.maybeFlagEntity(fbid, els[i]);
    }
};

PAT_FB.parseApiUrl = function () {
    var a = document.createElement('a');
    a.setAttribute('href', PAT_FB.CONFIG.api_url);
    return {
        'protocol': a.protocol,
        'host': a.host,
        'port': a.port,
        'pathname': a.pathname
    };
}

/**
 * Queries the PAT-FB server for reports by Facebook ID. If a result is found,
 * applies styling to the HTML node appropriately.
 *
 * @param fbid The numeric Facebook ID to query.
 * @param el The HTML node from which the ID was scraped.
 */
PAT_FB.maybeFlagEntity = function (fbid, el) {
    if (!fbid) { PAT_FB.log('Invalid ID passed to maybeFlagEntity().'); return false; }
    if (fbid == PAT_FB.current_user && GM_getValue('ignore_reports_about_me', true)) {
        PAT_FB.log('Refusing to flag ourselves (current user ID ' + PAT_FB.current_user + ').');
        return false;
    }
    PAT_FB.log('About to query for reports on ID ' + fbid.toString());
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': PAT_FB.CONFIG.api_url + fbid.toString(),
        'headers': {
            'Cookie': GM_getValue('pat_fb_cookies')
        },
        'onload': function (response) {
            try {
                resp = JSON.parse(response.responseText);
                PAT_FB.log('Parsed response from PAT-FB for ' + fbid.toString() + ': ' + response.responseText);
            } catch (e) {
                PAT_FB.log('Caught error from reply: ' + response.responseText);
                return;
            }
            if (resp.reports) {
                el.style.border = PAT_FB.setBorderWidthByReportCount(resp.reports).toString() + 'px solid red';
                // Store data in the element.
                el.setAttribute('data-num-pat-reports', resp.reports.toString());
                el.setAttribute('data-pat-reportee-id', resp.reportee_id.toString());
            }
        }
    });
};

PAT_FB.setBorderWidthByReportCount = function (n) {
    if (n < 2) {
        n = 1;
    } else if (n > 4) {
        n = 5;
    }
    return n;
};
