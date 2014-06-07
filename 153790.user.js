// ==UserScript==
// @name           YouTube: Move video title back to the top
// @version        2.0
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var headline = document.getElementById("watch7-headline");
var container = document.getElementById("watch7-video-container");
headline.parentNode.removeChild(headline);
container.insertBefore(headline, container.firstChild);

GM_addStyle('#watch7-headline{background-color: #FBFBFB !important; padding: 0 0 0 0 !important; border: none !important; background: none !important;} #watch7-user-header{padding-top: 8px !important;}');

if (!(document.getElementById("watch7-playlist-container"))){
GM_addStyle('#watch7-video-container{padding-top: 0 !important;}');
} else {
GM_addStyle('#watch7-playlist-tray{height: auto !important;}'); }