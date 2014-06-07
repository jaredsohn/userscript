// ==UserScript==
// @name                Google wallpaper remover
// @description         removes wallpaper from Google start page
// @include     http://*.google.*/
// ==/UserScript==

function removeWallpaper(){
    var wp = document.getElementById('fpdi');
    var p = wp.parentNode;
    p.removeChild(wp);
}

window.addEventListener('load', removeWallpaper, false);
