// ==UserScript==
// @name           Remove ow.ly toolbar
// @author         Guilherme Garnier
// @namespace      http://blog.guilhermegarnier.com/
// @version        1.0
// @description    Removes ow.ly toolbar, redirecting to the real link
// @include        http://ow.ly/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i = 0; i <= links.length-1; i++) {
    if (links[i].getAttribute('class') == 'm close _closeButton _hoverToggleClosePane') {
        window.location = links[i].href;
        exit;
    }
}