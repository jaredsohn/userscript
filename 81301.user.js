// ==UserScript==
// @name           StumbleUpon Video Fullscreen
// @namespace      http://userscripts.org/users/emerix
// @include        http://video.stumbleupon.com/*
// ==/UserScript==

var myfunc = function(e) {
   mymovie = document.getElementById("mymovie");
   mymovie.setAttribute('allowFullScreen','true');
   mymovie.setAttribute('src', mymovie.getAttribute('src') + '&fullscreen=1&fs=1');
   innerVar = document.getElementById("stumbleVideoContainer").innerHTML;
   document.getElementById("stumbleVideoContainer").innerHTML=innerVar;
}

document.getElementById("stumbleButton").addEventListener("click", function(e) {
 setTimeout(myfunc,2000);
}, false);



