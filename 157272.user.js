// ==UserScript==
// @name            Crunchyroll: Resize Player To Window Size
// @description     Moves the video to the top of the website and resizes it to the screen size.
// @author          Chris H (Zren / Shade)
// @icon            http://crunchyroll.com/favicon.ico
// @homepageURL     http://userscripts.org/scripts/show/157272
// @downloadURL     http://userscripts.org/scripts/source/157272.user.js
// @updateURL       http://userscripts.org/scripts/source/157272.meta.js
// @namespace       http://xshade.ca
// @version         1.1
// @include         http*://*.crunchyroll.c*/*
// @include         http*://crunchyroll.c*/*
// ==/UserScript==
(function() {
    // Can't use !important with javascript element.style.___ so we need to inject CSS.
    // http://stackoverflow.com/a/462603/947742
    function addNewStyle(newStyle) {
        var styleElement = document.getElementById('styles_js');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'styles_js';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        styleElement.appendChild(document.createTextNode(newStyle));
    }
    
    var style = "html, body, #showmedia_video_box, #showmedia_video_box_wide, #showmedia_video_player { width: 100%; height: 100%; }";
    
    var videoBox = document.getElementById('showmedia_video_box') || document.getElementById('showmedia_video_box_wide');
    if (!videoBox) return;
    document.body.insertBefore(videoBox, document.body.firstChild);
    videoBox.style.width = '100%';
    videoBox.style.height = '100%';
    videoBox.style.backgroundColor = '#000';
    var videoPlayer = document.getElementById('showmedia_video_player');
    if (!videoPlayer) return;
    //var videoObject = videoBox.getElementsByTagName('object')[0];
    videoPlayer.width = '100%';
    videoPlayer.height = '100%';
    addNewStyle(style);
})();