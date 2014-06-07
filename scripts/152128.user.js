// ==UserScript==
// @name           YouTube MP3 Button
// @namespace      http://www.youtubeinaudio.com
// @description    A MP3 download button to Youtube
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @updateURL	   http://userscripts.org/scripts/source/152121.user.js
// @version        0.1
// ==/UserScript==

(function () {
    var YouTubeInAudioURL = 'http://www.youtubeinaudio.com/download.php?quality=128&submit=Download+MP3&youtubeURL=' + location.href, container = document.getElementById('watch-actions');

    if (container && !document.getElementById('watch-download')) {
        var btn = document.createElement('button'),lastContainerChild = container.lastElementChild;

        btn.className = 'master-sprite yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip';
        btn.id = 'watch-download';
        btn.setAttribute('type', 'button');
        btn.setAttribute('title', 'Download This Video');
        btn.setAttribute('class', 'yt-uix-button yt-uix-button-default');

        var txt = document.createElement('span');
        txt.appendChild(document.createTextNode('Download MP3'));

        btn.appendChild(txt);

        btn.addEventListener('click', function () {
            window.open(YouTubeInAudioURL, 'downloadWindow');
        }, false);

        if (lastContainerChild) {
            container.insertBefore(btn, lastContainerChild.nextSibling);
            lastContainerChild.style.marginRight = '0.5em';
        } else {
            container.appendChild(btn);
        }
    }

    if (location.search.search('v=') !== -1) {
        YouTubeInAudioURL = 'http://www.youtubeinaudio.com/download.php?quality=128&submit=Download+MP3&youtubeURL=' + 'http://www.youtube.com/watch?v=' + location.search.split('v=')[1].split('&')[0];
    } else {
        window.addEventListener('message', function (event) {
            YouTubeInAudioURL = 'http://www.youtubeinaudio.com/download.php?quality=128&submit=Download+MP3&youtubeURL=' + 'http://www.youtube.com/watch?v=' + event.data;
        }, false);

        location.assign('javascript:void(' + function () {
            typeof yt !== 'undefined' && window.postMessage(yt.getConfig('VIDEO_ID'), '*');
        }.toString() + '());');
    }
}());