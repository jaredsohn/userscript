// ==UserScript==
//         youtube html5 converter


// @name Youtube HTML5 Converter
// @version 1.0.1
// @author Christian Pedersen
// @namespace      http://userscripts.org/users/kingpedersen
// @description    converts the youtube player to the native video player of an html5 browser

// @include        http://www.youtube.com/watch?*

// ==/UserScript==


var t = unsafeWindow.fullscreenUrl.match(/\&t=([^(\&|$)]*)/)[1];
var videoid = unsafeWindow.pageVideoId;

var video_url_normal = "http://youtube.com/get_video?video_id="+videoid+"&t="+t;
var video_url_high = "http://youtube.com/get_video?video_id="+videoid+"&t="+t+"&fmt=18";
var video_url_HD = "http://youtube.com/get_video?video_id="+videoid+"&t="+t+"&fmt=22";

alert(video_url_normal);

var parent = document.getElementById('watch-this-vid');
var remove = document.getElementById('watch-player-div');
var remove2 = document.getElementsByTagName('script')[1];
parent.removeChild(remove);
parent.removeChild(remove2);
alert("removed youtube player?")


var newvideotag = document.createElement('video');
newvideotag.setAttribute('src',video_url_normal);
newvideotag.innerHTML = 'Your browser does not support the video tag.';
parent.appendChild(newvideotag);
alert("added new one?")