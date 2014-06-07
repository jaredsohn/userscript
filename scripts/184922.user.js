// ==UserScript==
// @name        youtube embeded - hq
// @namespace   asdf
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

var iframes = document.getElementsByTagName('iframe');

for (i = 0; i < iframes.length; i++) {
    s = iframes[i].src;
    if (s.indexOf("youtube.com/embed/") != -1 && s.indexOf("&vq=hd720") == -1) {
        iframes[i].src += "&vq=hd720";
    }
}
