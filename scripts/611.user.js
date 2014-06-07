// ==UserScript==
// @name          SourceForge.net direct download.
// @namespace     http://botanicus.net/dw/greasemonkey/
// @description	  When a default mirror is set, start download immediately.
// @include       http://prdownloads.sourceforge.net/*
// ==/UserScript==
//
// $Id: sourceforge-ddl.user.js 138 2005-11-09 10:44:37Z dw $

(function() {
    if (document.cookie.match('default_mirror')) {
        var cookie = document.cookie.match('default_mirror=[^;]*')[0];

        mirror = cookie.split('=')[1];

        window.location = new String(window.location)
            .replace('prdownloads', mirror + '.dl')
            .replace('?download', '');
    }
})()
