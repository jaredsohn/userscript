// ==UserScript==
// @name           yt-watch-wide
// @namespace      http://raidrush.org
// @description    youtube big player
// @include        http://www.youtube.com/watch*
// ==/UserScript==

// add `watch-wide` class to #page
document.querySelector('#page').classList.add('watch-wide');

// resize video area and player for 720p view
// 720(video) + 30(player-controls)
GM_addStyle('#watch-player { width: 1280px !important; height: 750px !important; }'
          + '#watch-video { width: 1280px !important; }');