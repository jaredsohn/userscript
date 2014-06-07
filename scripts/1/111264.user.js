// ==UserScript==
// @name           YouTube To MP3 or MP4 - Download Button
// @version        2.4
// @author         NicholasLAranda
// @description    Adds a "Download" button underneath any YouTube web player for extracting the audio and or video and saving it to a High Quality MP3 or MP4 file.
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// ==/UserScript==

var s = location.href.split("&");
var url=s[0];

document.getElementById('watch-actions').innerHTML += '<style>#button {margin-top: -2.71em; position: relative; left: 28em;} #watch-actions {height: 50px;}</style><div id="button"><a href="http://www.video2mp3.net/index.php?url='+ url +'&hq=1" id="link" title="Extract audio and or video from currently playing video and download into a High Quality MP3 or MP4 file." class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" target="_blank">Download</a></div>';