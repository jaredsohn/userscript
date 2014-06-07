// ==UserScript==
// @name        annoying poconorecord article block remover
// @namespace   dsadasd
// @include     http://www.poconorecord.com/*
// @version     1
// ==/UserScript==



try {

	// idiots, next time block content server side
	// try to block client side and you've already lost.
	unsafeWindow.doWall = {};


	//add back right clicks
	var $ = unsafeWindow.jQuery;
	setTimeout( function () {
		$(document).unbind("contextmenu");
		$(document).bind("contextmenu",function(e){ 
			return true; 
		}); 
	}, 1000)

} catch(e) { }
