// ==UserScript==
// @name           macrochan browse 200 pic
// @namespace      http://userscripts.org
// @description    allow you to see 200 images per pages on marcochan.org/browse
// @include        http://macrochan.org*
// ==/UserScript==

var link;
link = document.body.getElementsByTagName("a")

for (var i = 0; i < link.length; i++) {
    link[i].href = link[i].href.replace("search.py?","search.py?&perpage=200&")
}