// ==UserScript==
// @name        SAD
// @description Search and Destroy
// @updateURL   https://github.com/Kocal/JVCMaster/raw/master/JVCMaster.user.js
// @include     http://www.jeuxvideo.com/forums/*
// @include     https://www.jeuxvideo.com/forums/*
// @version     1.0.0
// ==/UserScript==

var url = 'https://raw.github.com/Komalis/SAD/master/SAD/Firefox/';
var script = document.createElement('script');
script.src = url + 'SAD.js';
document.body.appendChild(script);

delete script;