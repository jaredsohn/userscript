// ==UserScript==
// @name       google groups translate shortcut
// @namespace  http://jirox.net/
// @version    0.1
// @description  Add translate shortcut to Google Groups
// @include    https://groups.google.com/forum/*
// @copyright  2012+, Jiro Iwamoto
// ==/UserScript==
document.addEventListener('keydown', function(e) {
    if (e.keyCode != 84) return;
    var els = document.getElementsByClassName('GJNYXB3DFB GJNYXB3JU');
    if (els.length == 0) return;
    var el = els[0];
    var bodys = el.getElementsByClassName('GJNYXB3BU');
    for (var i = 0, len = bodys.length; i < len; i++) {
        var el = bodys[i];
        el.style.display = el.style.display == 'none' ? '' : 'none';
    }
}, true);
