// ==UserScript==
// @name           Youtube video size
// @namespace      CustomScripts
// @description    Changes Youtube video size.
// @include        https://www.youtube.com/*
// @include        https://youtube.com/*
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// @version        1.2
// @require        http://code.jquery.com/jquery-1.9.1.js
// @require        http://code.jquery.com/ui/1.10.1/jquery-ui.js
// @resource       customCSS http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css
// @grant          GM_addStyle
// @grant          GM_getResourceText
// ==/UserScript==
var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);
GM_addStyle ('#player-api{padding: 10px;} .watch7-playlist-bar {height: 100px; overflow: hidden;} .site-left-aligned.guide-enabled .watch7-playlist, .site-left-aligned.guide-enabled #watch7-video-container, .site-left-aligned.guide-enabled #watch7-main-container {padding-left: 0;} .yt-uix-clickcard-card, .yt-uix-hovercard-card {z-index: -1;} #watch7-video {background-color:#4076b7;padding:0 10px 10px 0;margin-bottom:20px !important;} #watch7-player {width:auto;height:auto;min-height:390px;min-width:640px;} #watch7-sidebar {margin-top: 0 !important;}#watch7-player object, #watch7-player embed {min-width: 640px;min-height: 390px;}');

$('#player-api').resizable ( {
    alsoResize: ".watch-medium, #watch7-player, #watch7-video"
} );