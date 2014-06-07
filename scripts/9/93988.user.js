// ==UserScript==
// @name          Mediabar of youtube!
// @version       4.
// @author	  Zabihullah Kasimi
// @namespace     http://zabihullah.com/
// @description   Adds a link on Youtube to convert the currently playing video to mp3 format
// @include       http://www.youtube.com/*
// @include       http://youtube.com/*
// @include       http://www.youtube.com/user*
// @include       http://www.youtube.com/user/*
// @include       http://youtube.com/user*
// @include       http://youtube.com/user/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==

var v = location.href.split("&");
var url=v[0];
document.getElementById('watch-headline-user-info').innerHTML += '<a target="_blank" href="http://zabihullah.com/watch/download.php?v='+ url + '" title=""><button class="yt-uix-button yt-uix-tooltip" type="button" title="High qality mp3" data-tooltip-timer="525" style="margin-right:4px;">Get MP3!</button></a>';

var s = location.href.split("v");
var url=s[1];
document.getElementById('watch-headline-user-info').innerHTML += '<a target="low" href="http://zabihullah.com/watch/mp3.php?v'+ url + '" title=""><button class="yt-uix-button yt-uix-tooltip" type="button" title="Convert this video to .Mp3 in low quality" data-tooltip-timer="525" style="margin-right:4px;">Low quality MP3!</button></a><iframe frameborder="0" name="yt" scrolling="no" width="440" height="15" src="http://www.zabihullah.com/ads/index.php"></iframe>';
document.getElementById('watch-headline-user-info').innerHTML += '<iframe name="low" frameborder="0" scrolling="no" src="about:blank" width="1" height="1"></iframe>';

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
document.getElementById('watch-info').innerHTML += '<iframe src="http://zabihullah.com/ads/top.php" height="81" width="728" marginwidth="0" marginheight="0" allowtransparency="true" frameborder="0" scrolling="no" bordercolor="#000000" hspace="0" vspace="0"></iframe>';

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
document.getElementById('comments-view').innerHTML += '<iframe src="http://zabihullah.com/ads/bottom.php" height="81" width="728" marginwidth="0" marginheight="0" allowtransparency="true" frameborder="0" scrolling="no" bordercolor="#000000" hspace="0" vspace="0"></iframe>';

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
document.getElementById('eow-title').innerHTML += '&nbsp;-<a href="http://www.zabihullah.com/" style="text-decoration: none; font-weight: 700"><font color="#008000">More Script</font></a>';