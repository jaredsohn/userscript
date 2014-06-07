// ==UserScript==
// @name       Youtube Retina Display Fix
// @namespace  http://cheeyoonlee.com
// @version    0.24
// @description  Fixes the annoying large player and content width mismatch on scaled Retina displays
// @match      https://www.youtube.com/watch?*
// @copyright  2014+ @cheeyoon
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.site-center-aligned #player.watch-large, .site-center-aligned #player.watch-medium, .site-center-aligned #player.watch-medium-540 { margin-bottom: 0 !important; }');
addGlobalStyle('.site-center-aligned #player.watch-medium { width: 1040px !important; }');
addGlobalStyle('.watch-medium .player-height { height: 615px !important; }');
addGlobalStyle('.watch-medium .player-width { width: 1040px !important; }');
addGlobalStyle('.watch-medium .html5-main-video, .html5-video-content { width: 1040px !important; height: 585px !important; }');