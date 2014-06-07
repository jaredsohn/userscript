// ==UserScript==
// @name           Simple Vimeo MP4 Downloader
// @namespace      http://vimeoinmp4.com
// @description    A download button will be added to Vimeo videos which lets you download any Vimeo video in MP4 format, instantly to your device.  No java or "right-click to save" required!
// @include        http://vimeo.com/*
// @include	   http*://vimeo.com/*
// @grant          none
// @version        1.00
// ==/UserScript==

// ==ChangeLog==
// @history        1.00 Initial release.
// ==/ChangeLog==

location.href = "javascript:(" + function () {
    var fplayer = document.getElementsByClassName("f player")[0].getAttribute("id");
    var clipo = eval(fplayer.replace("player_", "clip"));
	var page = document.location.href;
    var vidname = document.getElementsByClassName("video_meta")[0].getElementsByTagName("h1")[0].innerHTML;
    document.getElementsByClassName("video_meta")[0].innerHTML = document.getElementsByClassName("video_meta")[0].innerHTML + "<a style='text-decoration:underline;color:#167ee4;margin-top:-20px;float:right;' href='http://vimeoinmp4.com/vimeo.php?video="+page+"'>Download MP4</a> <br />";
} + ")()";