// ==UserScript==
// @name           GLB Home Page Auto-Refresh/Reload (30 Minute Version)
// @namespace      GLB
// @description    Automatically refreshes your home page every 30 minutes (half hour). This should work so you don't get auto logged out.
// @include        http://goallineblitz.com/game/home.pl
// @include        http://216.245.193.2/game/home.pl
// ==/UserScript==

var time = 1800000; //= 30minutes			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;