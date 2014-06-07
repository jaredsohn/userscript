// ==UserScript==
// @name            YouTube video HTML5 replace
// @namespace       Zentriple
// @description     Replaces YouTube flash video player with embedded HTML5.
// @include         http://www.youtube.com/watch?*
// @include         https://www.youtube.com/watch?*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version         1.1
// ==/UserScript==

flash = $("#movie_player");

ytVideoID = window.location.href.split('v=')[1].split('&')[0].split('#')[0];
videoHTML = '<iframe src="https://www.youtube.com/embed/'+ytVideoID+'?fs=1&autoplay=1" style="width:100%;height:100%;overflow:auto;" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';

flash.replaceWith(videoHTML);

console.log("YouTube video ["+ytVideoID+"] replaced.");
