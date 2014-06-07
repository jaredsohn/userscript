// ==UserScript==
// @name           KBT Redirect Bypass
// @author         fatro
// @version        1.2
// @description    Bypass redirect links with its real url
// @include        http://*kbt-project.com/*
// ==/UserScript==

var re = new RegExp("/redirect\.php\?.url=(.*)", "i");
var links = document.getElementsByTagName("a");
for (var i = 0; i <= links.length-1; i++) {
    var m = re.exec(links[i].href);
    if (m != null) {
        links[i].href = m[1];
    }
}