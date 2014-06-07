// ==UserScript==
// @name           Inkbunny SSL URLS
// @description    Converts all Inkbunny links to their encrypted equivalents.
// @author         Just_Lurking
// @namespace      http://inkbunny.net/
// ==/UserScript==

(function() {
    var links = document.evaluate(
        '//a[starts-with(@href, "http://inkbunny.net/")]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = 0; i < links.snapshotLength; i++) {
       var a = links.snapshotItem(i);
       var href = a.href;
       a.href = href.replace (/^http/, "https");
    }
})();