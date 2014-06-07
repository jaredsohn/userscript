// ==UserScript==
// @name           Pause all HTML5 videos on load
// @namespace      http://userscripts.org/users/Scuzzball
// @include        *
// ==/UserScript==

var videos = document.getElementsByTagName('video');
window.addEventListener('load', stopVideo, false);
function stopVideo()
{
    for (var i=0; i<videos.length; i++)
    {
        videos[i].pause();
        video.currentTime = 0;
    }
}
