/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           Predator Alert Tool for Bang With Friends (PAT-BWF)
// @namespace      com.maybemaimed.predator-alert-tool.bwf
// @description    PAT-BWF displays Predator Alerts linked to the profiles of the friends that appear on your Bang With Friends dashboard. Powered by Predator Alert Tool for Facebook.
// @include        https://www.bangwithfriends.com/*
// @include        http://www.bangwithfriends.com/*
// @include        https://predator-alert-tool.herokuapp.com/*
// @version        0.1
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_openInTab
// ==/UserScript==

PAT_BWF = {};
PAT_BWF.CONFIG = {
    'debug': false, // switch to true to debug.
    'api_url': 'https://predator-alert-tool.herokuapp.com/api.php?fbid='
};

// Utility debugging function.
PAT_BWF.log = function (msg) {
    if (!PAT_BWF.CONFIG.debug) { return; }
    console.log('PAT-BWF: ' + msg);
};

// Initializations.
GM_addStyle('\
.pat-reports-link { margin-top: 2px; }\
');
PAT_BWF.init = function () {
    // We need to capture the session cookies from the PAT-FB server, so if we
    // loaded the server's pages, save the cookies locally for later use.
    // TODO: But, um, this functionality really starts requiring a browser ext.
    if (unsafeWindow.location.host == PAT_BWF.parseApiUrl().host) {
        GM_setValue('PAT_BWF_cookies', document.cookie);
    }
    var MutationObserver = unsafeWindow.MutationObserver || unsafeWindow.WebKitMutationObserver;
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    // Skip text nodes.
                    if (mutation.addedNodes[i].nodeType == Node.TEXT_NODE) { continue; }
                    // Process all the rest.
                    PAT_BWF.main(mutation.addedNodes[i]);
                }
            }
        });
    });
    var el = document.body;
    observer.observe(el, {
        'childList': true,
        'subtree': true
    });
    PAT_BWF.main(document);
};
window.addEventListener('DOMContentLoaded', PAT_BWF.init);

// main() is given a start node (HTML tree) and processes appropriately.
PAT_BWF.main = function (node) {
    PAT_BWF.log('Starting main() on page ' + unsafeWindow.location.toString());
    var img_el = node.querySelector('img[src^="https://graph.facebook.com/"]');
    if (img_el) {
        var fbid = img_el.getAttribute('src').match(/\d+/)[0];
        PAT_BWF.log('Found Facebook ID ' + fbid + '.');
        PAT_BWF.injectReportLink(node, fbid);
        PAT_BWF.maybeFlagEntity(fbid, node);
    }
};

PAT_BWF.injectReportLink = function (el, fbid) {
    var a = document.createElement('a');
    a.setAttribute('href',
        PAT_BWF.parseApiUrl().protocol + '//' + PAT_BWF.parseApiUrl().host
        + '/reports.php?action=new&reportee_id=' + fbid
    );
    a.setAttribute('class', 'pat-reports-link');
    a.innerHTML = 'Add new Predator Alert';
    el.querySelector('.action').appendChild(a);
};

PAT_BWF.parseApiUrl = function () {
    var a = document.createElement('a');
    a.setAttribute('href', PAT_BWF.CONFIG.api_url);
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
PAT_BWF.maybeFlagEntity = function (fbid, el) {
    if (!fbid) { PAT_BWF.log('Invalid ID passed to maybeFlagEntity().'); return false; }
    PAT_BWF.log('About to query for reports on ID ' + fbid.toString());
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': PAT_BWF.CONFIG.api_url + fbid.toString(),
        'headers': {
            'Cookie': GM_getValue('PAT_BWF_cookies')
        },
        'onload': function (response) {
            try {
                resp = JSON.parse(response.responseText);
                PAT_BWF.log('Parsed response from PAT-FB for ' + fbid.toString() + ': ' + response.responseText);
            } catch (e) {
                PAT_BWF.log('Caught error from reply: ' + response.responseText);
                return;
            }
            if (resp.reports) {
                el.style.border = PAT_BWF.setBorderWidthByReportCount(resp.reports).toString() + 'px solid red';
                // Store data in the element.
                el.setAttribute('data-num-pat-reports', resp.reports.toString());
                el.setAttribute('data-pat-reportee-id', resp.reportee_id.toString());

                // Make PAT data visible to Bang With Friends interface.
                // and insert it into the card HTML.
                var a = document.createElement('a');
                a.setAttribute('href',
                    PAT_BWF.parseApiUrl().protocol + '//' + PAT_BWF.parseApiUrl().host
                    + '/reports.php?action=lookup&reportee_id='
                    + el.getAttribute('data-pat-reportee-id')
                );
                a.setAttribute('class', 'pat-reports-link');
                a.innerHTML = 'View ' + resp.reports.toString() + ' Predator Alerts';
                el.querySelector('.action').appendChild(a);
            }
        }
    });
};

PAT_BWF.setBorderWidthByReportCount = function (n) {
    if (n < 2) {
        n = 1;
    } else if (n > 4) {
        n = 5;
    }
    return n * 2; // Double the width so it's more visible in Bang With Friends's interface.
};
