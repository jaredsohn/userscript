// ==UserScript==
// @name          2ch sage
// @description   The mail address of 2ch & Shitaraba is always made sage.
// @include       http://*.2ch.net/*
// @include       http://*.bbspink.com/*
// @include       http://cha2.net/*
// @include       http://*.machi.to/*
// @include       http://jbbs.livedoor.jp/*
// ==/UserScript==
(function () {
    window.addEventListener('load', function () {
        var mail = document.getElementsByName('mail');
        for (i=0; mail.length > i; i++) {
            mail[i].value='sage';
        }
    },
                            false);
})();
