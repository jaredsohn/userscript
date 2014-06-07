// ==UserScript==
// @name           telenet_youtube_speed_fix
// @namespace      be.teknoman
// @description    Replaces regular video with the embedded version which loads faster for telenet users
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// @exclude        http://www.youtube.com/embed/*
// @exclude        http://youtube.com/embed/*
// ==/UserScript==

var myhtml = '<object style="height: 390px; width: 640px"><param name="movie" value="%theurl%"><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></param><embed src="%theurl%" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390"></embed></object>';
var yturl = location.href;
var embedurl = yturl.replace("watch?v=","v/");
var arr_url = embedurl.split("&");
embedurl = arr_url[0];
embedurl = embedurl + "?";
embedurl = embedurl + "version=3";
embedurl = embedurl + "&";
embedurl = embedurl + "fs=1";
embedurl = embedurl + "&";
embedurl = embedurl + "autoplay=1"
var rephtml = myhtml.replace("%theurl%",embedurl);
rephtml = rephtml.replace("%theurl%",embedurl);
rephtml = rephtml.replace("%theurl%",embedurl);
var watchplayer = document.getElementById("watch-player");
watchplayer.innerHTML = rephtml;