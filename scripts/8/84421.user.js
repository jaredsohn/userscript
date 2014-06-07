// ==UserScript==
// @name YouTube Like Remover
// @include http://*.youtube.com/watch*
// @include http://youtube.com/watch*
// ==/UserScript==

(function () {
document.getElementById('watch-like').getElementsByClassName('yt-uix-button-content')[0].innerText=''
})();