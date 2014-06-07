// ==UserScript==
// @name           Youtube recommend hidden
// @namespace      http://twitter.com/teraminato
// @description    Youtubeのおすすめに自分のビデオや、気が散るビデオが表示されて仕事にならない人のおすすめ消しゴム。
// @include        http://www.youtube.com/*
// @include        http://www.youtube.com/
// @version        0.1
// ==/UserScript==
(function() {
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("recommended-videos").style.display = "none";
}, false);
})();
