// ==UserScript==
// @name                Refreshes the page.
// @namespace           http://userscripts.org/scripts/show/121887
// @description         Refreshes and refreshes
// @include		*
// @note                There is no GUI, everything is backend, set settings to your liking.
// ==/UserScript==

// you can edit the seconds below with a content editor, such as notepad(what i use)
var time = 1000; 
//    0 milliseconds = 0
//  500 milliseconds = .5 second
// 1000 milliseconds = 1 second
// 2000 milliseconds = 2 seconds
// 3000 milliseconds = 3
			

window.setTimeout(

function() {
	window.location.reload();
}, time);