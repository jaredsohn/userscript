// ==UserScript==
// @name           Hacker News Style Edit
// @namespace      http://news.ycombinator.com
// @description    Make small changes to menu style
// @include        http://news.ycombinator.com/*
// ==/UserScript==

// my first attempt at a greasemonkey script.
//
// 1. change the colour of the bar at the top.

var tdArray = document.getElementsByTagName('td');
tdArray[0].bgColor = '#EHEHEH';

// 2. change the top left image from a "Y" to something less serious.

var y = document.images[0];

// this is just an example; you should probably host your own images.
y.src = 'http://i241.photobucket.com/albums/ff69/aquil3s/recreativos/alex%20kidd/alex-kidd2.gif';

// you will need to adjust the dimensions to fit whatever image you use.
y.width = '35';
y.height = '47';