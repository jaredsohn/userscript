// ==UserScript==
// @name       YouTube bigger video
// @namespace  http://eepp.ca/
// @version    0.1
// @description  Bigger non-fullscreen YouTube videos
// @match      *://*.youtube.com/*
// @copyright  2012+, Philippe Proulx
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

jQuery(document).ready(function() {
    jQuery('.watch-medium #player-api').css('width', '1200px');
    jQuery('.watch-medium #player-api').css('height', '716px');
});
