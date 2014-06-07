// ==UserScript==
// @name           Torrentz Cleaner
// @namespace      http://userscripts.org/users/78058
// @description    Remove "Sponsored Links" portion of Torrentz.com pages
// @include        http://*.torrentz.com/*
// @include        http://torrentz.com/*
// @exclude        http://www.torrentz.com/
// @exclude        http://www.torrentz.com/help
// @exclude        http://www.torrentz.com/verified
// @exclude        http://www.torrentz.com/search
// @exclude        http://www.torrentz.com/profile*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var search_sponsored = xpath("//div[@style]").snapshotItem(0);
search_sponsored.parentNode.removeChild(search_sponsored);

var result_sponsored = xpath("//iframe").snapshotItem(0);
result_sponsored.parentNode.removeChild(result_sponsored);