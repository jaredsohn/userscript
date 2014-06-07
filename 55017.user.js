// ==UserScript==
// @name           Ning Video Downloader
// @namespace      ning
// @description    Download user videos from ning.com groups.
// @include        http://*ning.com/*
// @date           2009-03-08
// @author         Manik Solutions
// @version        1
// ==/UserScript==

vid = document.getElementById('video-url').value;
inject = document.getElementById("xj_video_rating");
inject.innerHTML += "<font style='padding: 8px; font-weight:bold;' >[<a href='"+vid+"'>DOWNLOAD VIDEO</a>]</font>";