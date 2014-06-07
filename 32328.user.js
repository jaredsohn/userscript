// ==UserScript==
// @name           GLB Home Page Auto-Refresh/Reload (15 Minute Version)
// @namespace      GLB
// @description    Automatically refreshes your home page every 15 minutes. This should work so you don't get auto logged out.
// @include        http://goallineblitz.com/game/home.pl
// @include        http://216.245.193.2/game/home.pl
// ==/UserScript==

var time = 900000; //= 15minutes			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;