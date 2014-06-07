// ==UserScript==
// @name           fix PostgreSQL documentation links
// @namespace      postgresql
// @description    fix PostgreSQL documentation links
// @include        http://www.google.*/search?*
// @include        https://www.google.*/search?*
// @include        https://encrypted.google.*/search?*
// @include        https://startpage.com/do/search*
// @include        https://ixquick.com/do/search*
// ==/UserScript==

function fix_links() {
    var links = document.evaluate("//a[contains(@href, 'postgresql.org/docs/')]", document, null, 6, null);
    for(var i=0; i < links.snapshotLength; i++) {
        var l = links.snapshotItem(i);
        l.href = l.href.replace(/\/static\//,"/interactive/").replace(/\/docs\/(.*)\/interactive\//, "/docs/current/interactive/");
    }
}

fix_links();
