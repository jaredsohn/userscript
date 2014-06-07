// ==UserScript==
// @name        OpenSubtitles MKV player ad Jump
// @namespace   OpenSubtitles MKV player ad Jump
// @description Replace the ad link from "Download (zip)" from OpenSubtitles
// @include     http://www.opensubtitles.org/*
// @version     1
// @grant       none
// ==/UserScript==

a = document.getElementById("app_link");
a.parentNode.getElementsByTagName("a")[1].href = "http://dl.opensubtitles.org/es/download/sub/" + a.href.substr(-7);