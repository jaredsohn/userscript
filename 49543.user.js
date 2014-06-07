// PHD  user script
// version 1.0
// 2009-05-18
// Copyright (c) 2009, MrStatic
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Snotr Video Downloader
// @description   Add a "download" link to Snotr pages
// @include       http://www.snotr.com/video/*
// @include       http://snotr.com/video/*
// ==/UserScript==

var url;
url = "http://videos.snotr.com/" + unsafeWindow.__snotr_id + ".flv";

var rvbad, newElement;
rvbad = document.getElementById('rv-bad');
if (rvbad) {
    newElement = document.createElement("p");
    newElement.innerHTML = '&nbsp;&nbsp;<a href="' + url + '">Download</a>';
    rvbad.parentNode.insertBefore(newElement, rvbad.nextSibling);
}

