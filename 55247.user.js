// ==UserScript==
// @name           LinkedInExternalLinks
// @author         Guilherme Garnier
// @namespace      http://blog.guilhermegarnier.com/
// @version        1.0
// @description    Replace LinkedIn external links to open directly, and not inside a frame in LinkedIn site.
// @include        http://*linkedin.com/*
// ==/UserScript==

var re = new RegExp("/.*articleURL=([^&]*)", "i");
var re2 = new RegExp("/redirect\\?url=([^&]*)", "i");
var links = document.getElementsByTagName("a");
for (var i = 0; i <= links.length-1; i++) {
    var m = re.exec(links[i].href);
    if (m != null) {
        links[i].href = decodeURIComponent(m[1]);
    } else {
        m = re2.exec(links[i].href);
        if (m != null) {
            links[i].href = decodeURIComponent(m[1]);
        }
    }
}