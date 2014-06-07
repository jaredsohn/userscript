// ==UserScript==
// @name           MP3tunes Bigger Browser
// @namespace      http://svn.ideaharbor.org/greasemonkey
// @description    Increase the size of the album/artist browser box in your MP3tunes locker. This work best if your Streaming Method is set to M3U Playlists.
// @include        http://www.mp3tunes.com/locker/
// ==/UserScript==

// function from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#nav { width: 100% ! important; height: 300 ! important; }');
addGlobalStyle('#page table { width: 100% ! important; }');
addGlobalStyle('#tracks { width: 100% ! important; }');

