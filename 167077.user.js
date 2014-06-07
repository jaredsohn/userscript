// ==UserScript==
// @name       Awesome Autoplay Fix by Nekyo
// @version    0.1
// @description  Sometimes youtube turns off autoplay, so when you listen to long playlist it stops. This way,
// @include        http://www.youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function() {  
    if(!$('#watch7-playlist-bar-autoplay-button').hasClass('yt-uix-button-toggled')){
       $('#watch7-playlist-bar-autoplay-button').click();
    }
});