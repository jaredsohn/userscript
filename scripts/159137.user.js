// ==UserScript==
// @run-at         document-start
// @name           Brchan Evasor
// @author         Eu
// @description    f
// @version        0.3
// @include        http://*.brchan.org/*
// Versão Para Chrome: https://anonfiles.com/file/e8feb7b83fe3a33bbb993e6cccba425f
// ==/UserScript==

function main() {
    function d(n) {
        var v = (document.cookie + ';').match(new RegExp(n + '=.*;'));
        return v && v[0].split(/=|;/)[1]
    }
 window.screen.__defineGetter__('width', function () {
        return d('postpassword');
    });
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);