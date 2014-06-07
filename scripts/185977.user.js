// ==UserScript==
// @name        Down with Upworthy
// @namespace   userscript.danielrozenberg.com
// @description Skips Upworthy and links you directly to the YouTube / vimeo page
// @include     http://www.upworthy.com/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    var YOUTUBE_REGEXP = /^.+?youtube\.com\/embed\/(.+?)\?.*/;
    var VIMEO_REGEXP = /^.+?vimeo\.com\/video\/(\d+)\?.*/;

    var src = $('.fluid-width-video-wrapper iframe').attr('src');
    
    if (YOUTUBE_REGEXP.test(src)) {
        id = src.replace(YOUTUBE_REGEXP, "$1");
        window.location.replace("https://youtube.com/watch?v=" + id);
    } else if (VIMEO_REGEXP.test(src)) {
        id = src.replace(VIMEO_REGEXP, "$1");
        window.location.replace("https://vimeo.com/" + id);
    }
});