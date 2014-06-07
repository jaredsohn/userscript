// ==UserScript==
// @name       Tumblr Small/Big Font Resize
// @namespace  http://userscripts.org/users/511255/scripts
// @creator    kaaaaaye
// @version    1.0
// @description  Fixes the texts inside small and big tags
// @include    http://tumblr.com/*
// @include    https://tumblr.com/*
// @include    http://*.tumblr.com/*
// @include    https://*.tumblr.com/*
// @run-at     document-start
// @require    http://code.jquery.com/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $('div.post_body').find('small').css('font-size','smaller');
    $('div.post_body').find('big').css('font-size','larger');
});

$(window).scroll(function() {
    $('div.post_body').find('small').css('font-size','smaller');
    $('div.post_body').find('big').css('font-size','larger');
});