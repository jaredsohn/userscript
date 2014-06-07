// ==UserScript==
// @name YouTube Two Best Friends Play Skip Intro
// @namespace YTBFPSI
// @description Skips the first 7 second intro of any Two Best Friends Play videos.
// @version 03.30.13.0415
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @include https://www.youtube.com/watch*
// @exclude http://www.youtube.com/*&t=0m7s*
// @exclude https://www.youtube.com/*&t=0m7s*
// @author drhouse
// ==/UserScript==

var theurl = document.URL;

if (document.title.toString().indexOf("Two Best Friends") != -1)
    window.location.href = (theurl + "&t=0m7s");