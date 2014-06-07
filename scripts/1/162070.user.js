// ==UserScript==
// @name           KOC Executor Loader
// @version        1.0.0.20130315
// @namespace      http://userscripts.org/users/ogradyjd
// @downloadURL    http://userscripts.org/scripts/show/162057
// @include        *kabam.com/games/kingdoms-of-camelot/play*
// @include        *facebook.com/dialog/feed*
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==
$(document).ready(function() {
    alert('Loading KOC Executor...');
    $.getScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',function() {
        alert('What is up?');
        $.getScript('http://127.0.0.1:8050/kocexecutor.js');
    });
});
