// ==UserScript==
// @name        24Seven AlbumArt to Favicon
// @namespace   https://userscripts.org/users/27145
// @description Sets the favicon to be the album art of the currently playing track
// @include     http://1980s.fm/*
// @include     https://1980s.fm/*
// @include     http://death.fm/*
// @include     https://death.fm/*
// @include     http://www.streamingsoundtracks.com/*
// @include     https://www.streamingsoundtracks.com/*
// @include     http://entranced.fm/*
// @include     https://entranced.fm/*
// @include     http://adagio.fm/*
// @include     https://adagio.fm/*
// @version     1.0
// @grant       none
// @icon        http://www.streamingsoundtracks.com/themes/default/images/favicon.ico
// ==/UserScript==

// Find an image with an alt tag of "View Album Info"
var imgs = document.getElementsByTagName('img');
for (i = 0; i < imgs.length; i++) {
    if (imgs[i].hasAttribute('alt') && imgs[i].alt == 'View Album Info') {
        // Image found, set it as favicon
        var link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = imgs[i].src;
        var head = document.getElementsByTagName('head') [0];
        // delete existing favicon first
        for (j = 0; j < head.length; j++) {
            if ((head[j].rel == 'shortcut icon') || (head[j].rel == 'icon')) {
                head.removeChild(head[j]);
            }
        }
        head.appendChild(link);
        break;
    }
}
