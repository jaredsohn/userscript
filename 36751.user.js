// ==UserScript==
// @name           YouTube Video Only
// @namespace      http://po-ru.com/
// @description    Fill the screen with the video, and hide everything else.
// @include        http://*.youtube.com/watch*
// ==/UserScript==

(function(){
  GM_addStyle('body { height: 100% }');
  var video = document.getElementById('movie_player');
  video.parentNode.removeChild(video);
  video.width = '100%';
  video.height = '100%';
  document.body.innerHTML = '';
  document.body.appendChild(video);
})();
