// ==UserScript==
// @name           YouTube Troll
// @namespace      http://*.youtube.com/*
// @include        http://www.youtube.com/*
// ==/UserScript==

var con = document.getElementById("watch-player-unavailable-message");
con.style.bottom = '140px';
con.style.left = '60px';

var image = document.getElementById("watch-player-unavailable-icon-container").getElementsByTagName("img");
image[0].src = 'http://imgur.com/WZUN8.png';

var container = document.getElementById("watch-player-unavailable-message-container");
container.style.width = '350px';
container.style.padding = '10px';

container.innerHTML = "<div>Problem? <a href='http://www.google.com/support/youtube/bin/answer.py?answer=92571'>Learn more</a>.</div><div class='watch-unavailable-submessage'>Because, fuck you.</div>";