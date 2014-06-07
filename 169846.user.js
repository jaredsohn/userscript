// ==UserScript==
// @name        YoutubeVLCPlayer
// @namespace   youtube.de
// @include     http://www.youtube.com/watch?v=*
// @version     1
// ==/UserScript==

var a = document.getElementById("player-api");
a.innerHTML = '<embed type="application/x-vlc-plugin" name="VLC" autoplay="yes" loop="no" volume="100" width="640" height="480" target="'+document.URL+'">';

