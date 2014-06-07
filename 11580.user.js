// ==UserScript==
// @name           SchwabLinks
// @namespace      http://cynwoody.googlepages.com/
// @description    Changes eDoc links from JavaScript links to normal links.
// @include        https://investing.schwab.com/service?request=EDocs*
// ==/UserScript==

var links = document.links;
for (var x=0, limit=links.length; x<limit; ++x) {
    var link = links[x];
    var m = link.href.match(/^javascript:.+?'(\/service.+?)'/);
    if (m) {
        link.href = unescape(m[1]);
    }
}
