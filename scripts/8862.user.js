// ==UserScript==
// @name           Fix ORSM Video links for Firefox
// @namespace      http://www.orsm.net
// @description    Video URLs should point to files instead of PHP script
// @include        http://www.orsm.net/*
// ==/UserScript==

var link;

link = document.body.getElementsByTagName("a")

for (var i = 0; i < link.length; i++) {
    link[i].href = link[i].href.replace(/php\/movies.php\?file=/,'')
}