// ==UserScript==
// @name           Runescape Fullscreen
// @namespace      http://www.furaffinity.net/user/shaundreclin
// @description    Gets rid of jagex toolbar / ad frame
// @include        *world*.runescape.com*
// ==/UserScript==

freeToPlay = true;

document.getElementById('top').style.display='none';
document.getElementById('menu').style.display='none';

if(freeToPlay) {
    document.getElementById('dynamic').style.margin='-175px 0px 0px 0px';
} else {
    document.getElementById('dynamic').style.margin='-44px 0px 0px 0px';
}