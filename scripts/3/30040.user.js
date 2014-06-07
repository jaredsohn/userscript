// ==UserScript==
// @name           N4G Forwarder
// @namespace      http://omgwtflol.org/
// @description    Forwards you to the news story on N4G pages
// @include        http://www.n4g.com/*/News-*.aspx
// @include        http://www.n4g.com/News-*.aspx
// ==/UserScript==

document.location = getUrl();

function getUrl() {
    var links = document.getElementsByTagName('a');
    for (var i=0;i<links.length;i++) {
        if (links[i].className == 'VN_ReadFullStoryLink') {
            var url = links[i].href;
            return url;
        }
    }
}