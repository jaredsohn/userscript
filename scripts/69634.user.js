// ==UserScript==
// @name		YouTube LowRes Playback
// @description		Playback YouTube Video in Low Res for Low Speed Internet Connection
// @include   		http://*.youtube.com/*
// @version		1.1
// @contributor		http://www.febian.da.ru
// ==/UserScript==

if (location.href.indexOf('?v=')>0){if (location.href.indexOf('&fmt=5')==-1){top.location=location.href+'&fmt=5';}}