// ==UserScript==
// @name          Youtube video to HQ MP3
// @author	  Jamie Hyde, edit ifly2sky
// @description   Adds link to download video to HQ mp3
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// ==/UserScript==

var url = location.href.split("&");
var urlnew=url[0] + "&hq=1";
var snew= '<a target="_newtab" title="MP3로 다운로드" href="http://www.video2mp3.net/index.php?url='+ urlnew + '"><b>MP3 Download</b></a>';
document.getElementById('watch-video-extra').innerHTML += snew;