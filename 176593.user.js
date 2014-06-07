// ==UserScript==
// @name       HTML5 YouTube F key fullscreen
// @namespace  http://vincent.tengudev.com/
// @version    2014-02-18
// @description  Make YouTube's HTML5 player go fullscreen when pressing F
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @include http://www.youtube.com/results?*
// @include https://www.youtube.com/results?*
// @include http://www.youtube.com/feed/*
// @include https://www.youtube.com/feed/*
// @include http://www.youtube.com/?*
// @include https://www.youtube.com/?*
// @include http://www.youtube.com/
// @include https://www.youtube.com/
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @match http://www.youtube.com/results?*
// @match https://www.youtube.com/results?*
// @match http://www.youtube.com/feed/*
// @match https://www.youtube.com/feed/*
// @match http://www.youtube.com/?*
// @match https://www.youtube.com/?*
// @match http://www.youtube.com/
// @match https://www.youtube.com/
// @match http://s.ytimg.com/yts/jsbin/html5player*
// @match https://s.ytimg.com/yts/jsbin/html5player*
// @copyright  2013+, DaVince
// ==/UserScript==


function EnableFKey() {
    var elems = document.getElementsByTagName("video");
    if (elems.length > 0) { //video tag exists?
        document.getElementById("player-api").addEventListener("keypress", function(e) {
            if (e.which == 102 || e.which == 70) { //f or F key pressed?
                var elem = document.getElementById("player-api");
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                }
                else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                }
                else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                }
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function() { EnableFKey() });
document.addEventListener('DOMNodeInserted', function() { EnableFKey() }); //Inefficient, but whatever