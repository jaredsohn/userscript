// ==UserScript==
// @name           Last.fm Full-size Images
// @version        2.4
// @date           09/06/2012
// @author         Kirill Lashuk aka KL-7
// @namespace      http://about.me/kl7
// @description    Adds a link to the full-size version of the image in the gallery. Adds a link to the album's covers page.
// @include        http://www.last.fm/music/*/*
// @include        http://www.last.fm/music/*/+images/*
// @exclude        http://www.last.fm/music/+*
// @exclude        http://www.last.fm/music/*/_/*
// @include        http://www.lastfm.*/music/*/*
// @include        http://www.lastfm.*/music/*/+images/*
// @exclude        http://www.lastfm.*/music/+*
// @exclude        http://www.lastfm.*/music/*/_/*
// ==/UserScript==

(function() {
    var GM_Debug = 0;

    if (GM_Debug) {
        var log = (unsafeWindow.console) ? unsafeWindow.console.log: GM_log;
    } else {
        var log = function() {};
    }

    var ru = window.location.host.match(/lastfm.ru$/) ? 1: 0;

    var labels = {
        full_size: ['Get full size', 'Скачать'],
        covers: ['Cover Arts', 'Обложки'],
        all_covers: ['See all cover arts', 'Все обложки']
    }

    var label = function(key) {
        return labels[key][ru];
    }

    var album_page = document.getElementsByClassName('current')[0].firstChild.href.match(/albums$/);
    var image = document.getElementsByClassName('the-image');
    var view = image && image[0];

    // Image view page
    if (view) {
        // Add full-size image link
        var art_src = view.getElementsByTagName('img')[0].src;
        var link = document.createElement('a');
        link.href = art_src.replace(/serve\/[^\/]*/, 'serve/_');
        link.innerHTML = label('full_size');
        link.target = '_blank';

        var span = document.createElement('span');
        span.className = 'moduleOptions';
        span.appendChild(link);
        span.style.position = 'absolute';
        span.style.top = 0;
        span.style.right = 0;

        var imageDetails = document.getElementsByClassName('widget-imagedetails')[0];
        imageDetails.style.position = 'relative';
        imageDetails.appendChild(span);

        log('fullsize link added');

    // Album main page
    } else if (album_page && document.getElementById('catalogueHead')) {
        var covers_link = document.createElement('a');
        covers_link.href = window.location.href + '/+images';
        covers_link.innerHTML = label('all_covers');

        var span = document.createElement('span');
        span.className = 'moduleOptions';
        span.appendChild(covers_link);

        document.getElementById('catalogueHead').getElementsByClassName('albumCover')[0].appendChild(span);

        log('covers link added');
    }
})();
