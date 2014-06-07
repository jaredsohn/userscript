// ==UserScript==
// @name          Facebook HashTag Removal
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @description   Remove all hashtags from Facebook news feed
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     https://*.facebook.com/*
// @include     http://*.facebook.com/*
// @version     1.11
// ==/UserScript==
this.$ = jQuery.noConflict(true);
$(function () {
    $('a[href*="hashtag"]').remove();
    $(window).scroll(function () {
        $('a[href*="hashtag"]').remove()
    })
})