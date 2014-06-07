// ==UserScript==
// @name           Tynt Killer
// @namespace      *
// @include        http://*
// @author         Andrei
// ==/UserScript==

unsafeWindow.tyntKillerTries = 0;
unsafeWindow.tyntKiller = unsafeWindow.setInterval( function()
{
	if ( unsafeWindow.tyntKillerTries === 10 ) {
		unsafeWindow.clearInterval ( unsafeWindow.tyntKiller );
	}
	if ( unsafeWindow.Tynt !== undefined ) {
		unsafeWindow.clearInterval ( unsafeWindow.tyntKiller );
		unsafeWindow.Tynt = function(){};
		unsafeWindow.Tynt.join = function(){};
	}
	unsafeWindow.tyntKillerTries++;
}, 1000 );