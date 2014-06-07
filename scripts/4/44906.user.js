// ==UserScript==
// @name            1UP Games/Not Games/NGR Refresh Every 3 Minutes
// @namespace       The Official 1UP Message Boards
// @include         http://www.1up.com/boards/forums/show/4.page
// @include         http://www.1up.com/boards/forums/show/5.page
// @include         http://www.1up.com/boards/forums/show/32116.page
// ==/UserScript==
var SECOND = 1000 ;
var MINUTE = 60 * SECOND ;
var PERIOD = 180 * SECOND ;	// 3 seconds. Change this if you want it to refresh faster or slower.

{
	window.setTimeout( function() {window.location.reload() ;}, PERIOD);
	}