// ==UserScript==
// @name        Flash->HTML5video
// @namespace   http://geeks.com
// @include     http://www.ardmediathek.de/*
// @version     1
// @grant       none
// ==/UserScript==

var elems = document.getElementsByTagName('*'), i;
var url = "";
for (i in elems) {
    if((' ' + elems[i].className + ' ').indexOf(' mt-player_container ') > -1) {
        var node = elems[i].children[0];
        var h = node.innerHTML;
        var matches = h.match(/"(http:.*\.mp4)"/g);
        for (m in matches) {
           url = matches[m];
        }
        elems[i].innerHTML='<video width="512" height="288" controls autoplay>' +
            '<source src=' + url + ' type="video/mp4">' +
            'Codec nicht unterstützt...' +
            '</video>';
    }
}
