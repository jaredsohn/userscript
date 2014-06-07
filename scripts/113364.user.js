// ==UserScript==
// @name           Grease Tube
// @namespace      http://userscripts.org/users/6989/grease-tube
// @description    Enhance the YouTube user interface.
// @include        https://www.youtube.com/*
// @include        http://www.youtube.com/*
// ==/UserScript==

(function() {
    // video view
    GM_addStyle("#watch-panel                   { display: none }");
    GM_addStyle("#watch-video-extra             { display: none }");
    GM_addStyle("#ppv-container .featured-label { display: none }");
    GM_addStyle("#watch-sidebar .watch-module       { margin-left: 20px; margin-right: 20px; }");
    GM_addStyle("#watch-sidebar                     { margin-top:  20px; float: none; width: 100% }");
    GM_addStyle("#page.watch-branded #watch-sidebar { margin-top:  20px; float: none; width: 100% }");
    GM_addStyle("#watch-player                      { width: 100% }");
    GM_addStyle("#watch-player                      { width: 100% }");
    GM_addStyle(".video-list-item { clear: none; float: left; height: 150px; width: 180px; }");

    // user view
    GM_addStyle("#playnav-video-details { display: none }");
    GM_addStyle("#main-channel-content { display: none }");
    GM_addStyle("#playnav-body { height: 1000px }");
    GM_addStyle(".playnav-player-container, #movie_player { width: 100% }");
    GM_addStyle("#playnav-play-panel { left: auto; position: auto; top:auto; width: 100% }");
    GM_addStyle(".scrollbox-header { display: none }");
    GM_addStyle("#playnav-playview .playnav-video { float: left; width: 290px; clear: none }");
}());