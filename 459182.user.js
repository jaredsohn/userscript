// ==UserScript==
// @name        Youtube - Don't share this video!
// @namespace   http://userscripts.org/users/642947
// @description No more "Share this Video" after playback. It simply disables it.
// @downloadURL https://userscripts.org/scripts/source/459182.user.js
// @updateURL   https://userscripts.org/scripts/source/459182.meta.js
// @include	http://youtube.com*
// @include	http://www.youtube.com*
// @include	https://youtube.com*
// @include	https://www.youtube.com*
// @version     0.1
// @author      novek
// @grant       none
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function () {
    yt.setConfig({
        'SHARE_ON_VIDEO_END': false
    });
});
