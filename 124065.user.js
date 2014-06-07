// ==UserScript==
// @name ShingekinoBahamut
// @namespace http://sp.pf.mbga.jp/12007160
// @version 0.3
// @description ShingekinoBahamutPC
// @include http://sp.pf.mbga.jp/12007160/*
// @copyright seth
// ==/UserScript==
(function (w) {
    var d = w.document;

    var doit = function () {
//        w.accessError = function () {};
        w.accessErrorRedirect = function () {};
        w.unloadBye = function () {};
        w.fadeOut = w.fadeIn;

        var loading = d.getElementById('loading');
        if ( loading ) { loading.style.display = 'none'; }
        var pics = d.getElementById('pics');
        if ( pics ) { pics.style.display = 'block'; }
    };

    doit();
    d.addEventListener("DOMContentLoaded", doit, false);
    w.addEventListener("load", doit, false);

})(unsafeWindow);