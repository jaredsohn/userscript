// ==UserScript==
// @name        Streak blocker
// @description Block streak tracker
// @include     https://mail.google.com/
// @version     1
// @grant       none
// ==/UserScript==

var imgs=document.images;
for(var i = 0; i < imgs.length; i++) {
    if imgs[i].src.lastIndexOf('https://mailfoogae.appspot.com/', 0) === 0) {
        imgs[i].parentNode.removeChild(imgs[i]);
    }
}