// ==UserScript==
// @name           YouTube HD - Larger Video
// @namespace      http://dodesign.us
// @description    Make the YouTube HD and HQ videos slightly wider so they extend to fit the page.
// @include        http://www.youtube.com/*
// @include        http://*.youtube.com/*
// ==/UserScript==

(function() {
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}
addGlobalStyle(

' #watch-this-vid.watch-wide-mode #watch-player-div, .watch-wide-mode #watch-this-vid #watch-player-div {' +
' padding-left:0px; !important;' +
'}' +

'#watch-this-vid.watch-wide-mode #watch-player-div #movie_player, .watch-wide-mode #watch-this-vid #watch-player-div #movie_player {' +
' width:960px !important; height:566px; !important' +
'}' +


'}');
})();