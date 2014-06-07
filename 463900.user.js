// ==UserScript==
// @name        en3video.com
// @namespace   http://www.lagasystems.com.ar/gms/en3video.js
// @include     http://lol.en3video.com/miralo/*
// @version     1
// @grant       none
// ==/UserScript==
var TempURL = window.location.href;
var FinalURL = TempURL.replace("miralo","video");
window.location = FinalURL;
