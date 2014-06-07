// ==UserScript==
// @name           Abload.de Direct Link
// @namespace      http://userscripts.org/users/33515/scripts
// @description    Verlinkt Bilder von Abload.de direkt auf die Bilddatei, nicht auf den Bildbetrachter (zB bei Thumbnails)
// @include        *
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
    if (links[i].href.match(/abload\.de\/image\.php\?img=(.+)/gi)) {
        links[i].href = "http://www.abload.de/img/"+RegExp.$1;
    }
}