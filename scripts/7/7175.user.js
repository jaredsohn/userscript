// ==UserScript==

// @name          MplayerTube

// @namespace     http://tony-b.net

// @description   Makes youtube videos play in mplayerplug-in

// @include       http://www.youtube.*/*

// @include       http://youtube.*/*

// ==/UserScript==



// YouTube URL: http://www.youtube.com/watch?v=[video_id]

// YouTube download link: http://youtube.com/get_video?video_id=[video_id]&t=[t_id]





var playerDiv2 = document.getElementById("watch-player-div");

var tid=playerDiv2.innerHTML.match(/t=([^(\&|$)]*)/)[1];

var vid=playerDiv2.innerHTML.match(/video_id=([^(\&|$)]*)/)[1];

if(String(document.location).match(/.*\&lowquality/)) {

   var video_url="http://youtube.com/get_video?video_id="+vid+"&t="+tid;

} else {

  var video_url="http://youtube.com/get_video?video_id="+vid+"&t="+tid+"&fmt=18";

}

playerDiv2.innerHTML = '<embed type="application/x-mplayer2" src="' + video_url + '" width="480" height="388"><br /><a href="'+document.location+'&lowquality">Normal Quality</a>' ;

