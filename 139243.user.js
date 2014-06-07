// ==UserScript==
// @name           YouTube enable autoplay again
// @namespace      http://gewooniets.nl/
// @description    YouTube enable autoplay again
// @include        http://www.youtube.com/*
// ==/UserScript==

(function () {
    var button = document.getElementById('playlist-bar-autoplay-button');
    console.log(button);
    if (button.className.indexOf('yt-uix-button-toggled') < 0) {
        button.click();
    }
}());
