/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           Predator Alert Tool for Lulu (PAT-Lulu)
// @version        0.1
// @namespace      com.maybemaimed.predator-alert-tool.lulu
// @updateURL      https://userscripts.org/scripts/source/179813.user.js
// @description    PAT-Lulu displays Predator Alerts linked to the profiles of the guys that appear on your Lulu dashboard. Powered by Predator Alert Tool for Facebook.
// @include        https://onlulu.com/*
// @include        https://predator-alert-tool.herokuapp.com/*
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_openInTab
// ==/UserScript==
PAT_LULU = {};
PAT_LULU.CONFIG = {
    'debug': false, // switch to true to debug.
    'api_url': 'https://predator-alert-tool.herokuapp.com/api.php?fbid='
};

// Utility debugging function.
PAT_LULU.log = function (msg) {
    if (!PAT_LULU.CONFIG.debug) { return; }
    GM_log('PAT-Lulu: ' + msg);
};
// Test for asynchronous variable loading.
//function whenAvailable (global_varname, callback) {
//    console.log(arguments.callee);
//    var interval = 100; // milliseconds
//    if (unsafeWindow[global_varname]) {
//        callback(unsafeWindow[global_varname]);
//    } else {
//        setTimeout(function() {
//            if (unsafeWindow[global_varname]) {
//                callback(unsafeWindow[global_varname]);
//            } else {
//                setTimeout(arguments.callee, interval);
//            }
//        }, interval);
//    }
//};
//whenAvailable('FB', function () {
//    PAT_LULU.getUserID = function () {
//        return unsafeWindow.FB.getUserID();
//    };
//    setTimeout(function () {
//        console.log(PAT_LULU.getUserID());
//    }, 6000);
//});

// Initializations.
GM_addStyle('\
.pat-reports-link { color: red;}\
p.guysDashboardCardViews + p.guysDashboardCardViews {\
    margin-top: 0;\
}\
');
PAT_LULU.init = function () {
    // We need to capture the session cookies from the PAT-FB server, so if we
    // loaded the server's pages, save the cookies locally for later use.
    // TODO: But, um, this functionality really starts requiring a browser ext.
    if (unsafeWindow.location.host == PAT_LULU.parseApiUrl().host) {
        GM_setValue('PAT_LULU_cookies', document.cookie);
    }
    var MutationObserver = unsafeWindow.MutationObserver || unsafeWindow.WebKitMutationObserver;
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    // Skip text nodes.
                    if (mutation.addedNodes[i].nodeType == Node.TEXT_NODE) { continue; }
                    // Process all the rest.
                    PAT_LULU.main(mutation.addedNodes[i]);
                }
            }
        });
    });
    var el = document.body;
    observer.observe(el, {
        'childList': true,
        'subtree': true
    });
    PAT_LULU.main(document);
};
window.addEventListener('DOMContentLoaded', PAT_LULU.init);

// main() is given a start node (HTML tree) and processes appropriately.
PAT_LULU.main = function (node) {
    PAT_LULU.log('Starting main() on page ' + unsafeWindow.location.toString());
    var els = node.querySelectorAll('.guysDashboardCard');
    for (var i = 0; i < els.length; i++) {
        var img_el = els[i].querySelector('img[src^="https://graph.facebook.com/"]');
        if (img_el) {
            var fbid = img_el.getAttribute('src').match(/\d+/)[0];
            PAT_LULU.log('Found Facebook ID ' + fbid + '.');
            PAT_LULU.injectReportLink(els[i], fbid);
            PAT_LULU.maybeFlagEntity(fbid, els[i]);
        }
    }
};

PAT_LULU.injectReportLink = function (el, fbid) {
    var p = document.createElement('p');
    p.setAttribute('class', 'guysDashboardCardViews');
    var a = document.createElement('a');
    a.setAttribute('href',
        PAT_LULU.parseApiUrl().protocol + '//' + PAT_LULU.parseApiUrl().host
        + '/reports.php?action=new&reportee_id=' + fbid
    );
    a.setAttribute('class', 'pat-reports-link');
    a.innerHTML = 'Add new Predator Alert';
    // Lulu intercepts clicks, so let's add our own event here.
    a.addEventListener('click', function (e) {
        GM_openInTab(this.getAttribute('href'));
    });
    p.appendChild(a);
    el.querySelector('.guysDashboardCardInfo').appendChild(p);
};

PAT_LULU.parseApiUrl = function () {
    var a = document.createElement('a');
    a.setAttribute('href', PAT_LULU.CONFIG.api_url);
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
PAT_LULU.maybeFlagEntity = function (fbid, el) {
    if (!fbid) { PAT_LULU.log('Invalid ID passed to maybeFlagEntity().'); return false; }
    PAT_LULU.log('About to query for reports on ID ' + fbid.toString());
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': PAT_LULU.CONFIG.api_url + fbid.toString(),
        'headers': {
            'Cookie': GM_getValue('PAT_LULU_cookies')
        },
        'onload': function (response) {
            try {
                resp = JSON.parse(response.responseText);
                PAT_LULU.log('Parsed response from PAT-FB for ' + fbid.toString() + ': ' + response.responseText);
            } catch (e) {
                PAT_LULU.log('Caught error from reply: ' + response.responseText);
                return;
            }
            if (resp.reports) {
                el.style.border = PAT_LULU.setBorderWidthByReportCount(resp.reports).toString() + 'px solid red';
                // Store data in the element.
                el.setAttribute('data-num-pat-reports', resp.reports.toString());
                el.setAttribute('data-pat-reportee-id', resp.reportee_id.toString());

                // Make PAT data visible to Lulu interface.
                // and insert it into the card HTML.
                var p = document.createElement('p');
                p.setAttribute('class', 'guysDashboardCardViews');
                var a = document.createElement('a');
                a.setAttribute('href',
                    PAT_LULU.parseApiUrl().protocol + '//' + PAT_LULU.parseApiUrl().host
                    + '/reports.php?action=lookup&reportee_id='
                    + el.getAttribute('data-pat-reportee-id')
                );
                a.setAttribute('class', 'pat-reports-link');
                // Lulu intercepts clicks, so let's add our own event here.
                a.addEventListener('click', function (e) {
                    GM_openInTab(this.getAttribute('href'));
                });
                a.innerHTML = 'View ' + resp.reports.toString() + ' Predator Alerts';
                p.appendChild(a);
                el.querySelector('.guysDashboardCardInfo').appendChild(p);
            }
        }
    });
};

PAT_LULU.setBorderWidthByReportCount = function (n) {
    if (n < 2) {
        n = 1;
    } else if (n > 4) {
        n = 5;
    }
    return n * 2; // Double the width so it's more visible in Lulu's interface.
};
