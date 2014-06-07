// ==UserScript==
// @name       Tumblr Dashboard Tags Wrapper
// @namespace  http://userscripts.org/users/511255/scripts
// @creator    kaaaaaye
// @version    3.01
// @description  Allows all tags to be seen without the need to drag.
// @include    http://tumblr.com/*
// @include    https://tumblr.com/*
// @include    http://*.tumblr.com/*
// @include    https://*.tumblr.com/*
// @run-at     document-start
// @require    http://code.jquery.com/jquery.min.js
// @updateURL  http://userscripts.org/scripts/source/163395.user.js
// ==/UserScript==

$(document).ready(function() {
    $('.post_tags_inner').css('display', 'block');
    $('.post_tags_inner').css('whiteSpace', 'normal');
});

$(window).scroll(function() {
    $('.post_tags_inner').css('display', 'block');
    $('.post_tags_inner').css('whiteSpace', 'normal');
});