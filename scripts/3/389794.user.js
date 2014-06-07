// ==UserScript==
// @name        googledirectlinkt
// @namespace   urn:lwn
// @include     https://*.google.*/search*
// @version     1
// ==/UserScript==

function fix(a) {
    var href = a.href,
        i = href.indexOf('?'),
        queryItems,
        queryItem;
    if (i === -1) {
        return;
    }
    queryItems = href.substr(i + 1).split('&');
    for (i = 0; i < queryItems.length; i += 1) {
        queryItem = queryItems[i];
        if (queryItem.substr(0, 6) === "q=http") {
            href = queryItem.substr(2);
            a.href = decodeURIComponent(decodeURI(href));
            break;
        }
        if (queryItem.substr(0, 7) === "imgurl=") {
            href = queryItem.substr(7);
            a.href = decodeURIComponent(decodeURI(href));
            break;
        }
    }
}
var list = document.querySelectorAll("a[href]"),
    i, e;
for (i = 0; i < list.length; i += 1) {
    e = list.item(i);
    fix(e);
}