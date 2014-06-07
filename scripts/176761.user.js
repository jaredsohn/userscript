// ==UserScript==
// @name        OutboundLinkHighlighter
// @namespace   http://paulharvey.com.au
// @include     *
// @exclude     *.google.*
// @exclude     *wp-admin*
// @version     1
// ==/UserScript==

GM_log("Start " + GM_info.script.name);
GM_addStyle(".FollowLink { padding: 3px; border-radius: 7px; box-shadow: 0 0 20px 5px red !important}");
GM_addStyle(".NoFollowLink { padding: 3px; border-radius: 7px; box-shadow: 0 0 20px 5px green !important}");
var links = document.evaluate('//a[contains(@href,"http") and not(contains(@href, "' + url_domain(window.location) + '"))]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i++) {
    var link = links.snapshotItem(i);
    GM_log(link.href);
    var nofollow = link.getAttribute('rel');
    if (nofollow == 'nofollow') {
        link.setAttribute('class', 'NoFollowLink');
    } else {
        link.setAttribute('class', 'FollowLink');
        link.focus();
    }
}

function url_domain(data) {
    var a = document.createElement('a');
    a.href = data;
    return a.hostname;
}