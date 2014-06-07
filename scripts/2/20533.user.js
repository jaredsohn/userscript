// ==UserScript==
// @name           Yahoo Player
// @namespace  http://hotrodscott.wordpress.com/2008/01/17/greasemonkey-yahoo-player/
// @description  Adds Yahoo player to any page it finds with links to mp3s
// @include        *
// @exclude	   http://music.yahoo.com/*
// @exclude	   http://*.music.yahoo.com/*
// @exclude	   http://new.*.music.yahoo.com/*
// @exclude	   http://*.launch.yahoo.com/*
// @exclude	   http://mail.google.com/*
// ==/UserScript==

// adds player to page
var head = document.getElementsByTagName('head')[0];
if (!head) { return; }
var yscript = document.createElement('script');
yscript.type = 'text/javascript';
yscript.src = 'http://mediaplayer.yahoo.com/js';
head.appendChild(yscript);  	