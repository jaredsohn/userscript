// ==UserScript==
// @name         Stop Auto Play HTML5 Video
// @include      *
// @author       Protector one
// ==/UserScript==

(function(){
  var i, vid,
    videos = document.getElementsByTagName('video'),
    script = document.createElement('script'),
    pauseReset = function(){
      this.pause();
      this.currentTime = 0
    };
  for (i=0; i<videos.length; ++i) {
    vid = videos[i];
    vid.pause();
    vid.addEventListener('loadedmetadata', pauseReset, false);
  }
  var ival = [setInterval(function(){
    for (i=0; i<videos.length; ++i)
      videos[i].pause();
    if (++ival[1] > 30)
      clearInterval(ival[0]);
    }, 99), 0];
})();