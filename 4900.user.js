// ==UserScript==
// @name        Google Video Flash Player Replacer
// @namespace   None
// @description replaces the flash player on google video with vlc plugin
// @include     http://video.google.com/videoplay*

// ==/UserScript==


/*Copyright (c) 2006, Robert Poekert
 *Released under the terms of the GNU General Public License
 *This software is distributed in the hopes that it will be useful, but does not come 
 *under warranty, even the implied warranty of merchantability or fitness for a particular purpose.*/


var videoURL = document.getElementById("macdownloaddiv").getElementsByTagName("a")[0];


var vlcPlayer = '<embed type="application/x-google-vlc-plugin" name="video1" autoplay="no" loop="yes" width="100%" height="96%" target="'+videoURL+'" /> <br /> <div  width="100%" height="5" id="playerControls" style="border:0px; background-color:#ccc;"><img src="http://tango.freedesktop.org/static/cvs/tango-icon-theme/16x16/actions/media-playback-start.png" onclick=\'document.video1.play()\' alt="Play"/> <img src="http://tango.freedesktop.org/static/cvs/tango-icon-theme/16x16/actions/media-playback-pause.png" onclick=\'document.video1.pause() \' alt="Pause" /> <img src="http://tango.freedesktop.org/static/cvs/tango-icon-theme/16x16/actions/media-playback-stop.png" onclick=\'document.video1.stop()\' alt="Stop" /><img src="http://tango.freedesktop.org/static/cvs/tango-icon-theme/16x16/actions/view-fullscreen.png" onclick=\'document.video1.fullscreen()\' alt="Fullscreen"/> </div>';


document.getElementById("flashobjectplaceholder").innerHTML = vlcPlayer;







