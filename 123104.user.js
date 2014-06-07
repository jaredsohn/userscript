// ==UserScript==
// @name Livejournal: Set own style(=mine) even for free accounts
// @description Append ?style=mine to all LJ links
// @include *livejournal.com*
// @copyright   Alex Frost
// @version     1.0.1
// @licence     LGPL 3
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {
    var url = links[i].href;
    if (url.indexOf('livejournal.com') > -1 && url.indexOf('style=mine') == -1) {
        if (url.indexOf("?") > -1) {
            links[i].href = url.replace('?', '?style=mine&');
        }
        else if (url.indexOf("#") > -1) {
            links[i].href = url.replace('#', '?style=mine#');
        }
        else {
            links[i].href += "?style=mine";
        }
    }
}