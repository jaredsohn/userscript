// ==UserScript==
// @name       Anti-Idle in der Shoutbox
// @namespace  http://www.elitepvpers.com/
// @version    133.7
// @include     http://www.elitepvpers.com/forum/*
// @description  bLUM3 ist geil
// @match      http://www.elitepvpers.com/forum/
// @copyright  2013, bLUM3
// ==/UserScript==

setInterval(function() {
	return chatbox_refresh('forced');
}, 5*60*1000);