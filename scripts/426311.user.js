// ==UserScript==
// @name           Google Music Favicon Changer
// @author         FPJaques
// @description    Changes favicon of google play music for better discriminability of play store and play music
// @include        https://play.google.com/music*
// @include        http://play.google.com/music*
// @run-at         document-start
// @icon           https://dl.dropboxusercontent.com/u/9838434/play_music_icon_32x32.png
// @version        1.0
// ==/UserScript==


// thanks to mathiasbynens ( https://gist.github.com/mathiasbynens/428626 )

setInterval(function(){changeIcon()}, 1500);
changeIcon();                      
function changeIcon() {
    var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = 'https://dl.dropboxusercontent.com/u/9838434/play_music_icon_32x32.png';
    if (oldLink) {
        document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}
// golden icon:
// https://dl.dropboxusercontent.com/u/9838434/google-music.png