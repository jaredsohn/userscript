// ==UserScript==
// @name           ESPN Video Manual Play
// @namespace      http://dustycoals.com/
// @description    Disables automatic video playback on ESPN.
// @include        http://*.espn.go.com/*
// ==/UserScript==

(function(){
   var videos = Array.prototype.slice.call(document.getElementsByTagName('embed'));
   videos.forEach(function(video){
       video.setAttribute('src', video.getAttribute('src').replace(/&autostart=true/, '&autostart=false'));
   });
})();