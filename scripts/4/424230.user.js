// ==UserScript==
// @name        CSFD.cz VideoFix
// @namespace   http://userscripts.org/users/526415
// @include     http://*csfd.cz/film/*/videa*
// @description Skips commercials when watching a video at CSFD.cz and forces the highest quality possible
// @version     0.1.1
// @grant       none
// @downloadURL http://userscripts.org/scripts/source/424230.user.js
// @updateURL   http://userscripts.org/scripts/source/424230.meta.js
// ==/UserScript==

var i, j;
var video = document.getElementsByTagName('video');
if (video.length > 0) {
    for (i = 0; i < video.length; i++) {
        var sources = video[i].getElementsByTagName('source');
        for (j = 0; j < sources.length-1; j++) {
            video[i].removeChild(sources[j]);
        }
    }
}  
