// ==UserScript==
// @name           Runescpe Fixer
// @namespace      Bitz 
// @description    Remove everything on the page except the game client.
// @include        *world*.runescape.com*
// ==/UserScript==

freeToPlay = true;

document.getElementById('top').style.display='none';
document.getElementById('menu').style.display='none';
document.getElementById('bottom').style.display='none';

if(freeToPlay) {
    document.getElementById('dynamic').style.margin='-175px 0px 0px 0px';
} else {
    document.getElementById('dynamic').style.margin='-44px 0px 0px 0px';
}