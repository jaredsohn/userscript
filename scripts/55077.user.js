// ==UserScript==
// @name           GLB Home Page Auto-Refresh/Reload (30 seconds Version)
// @namespace      GLB
// @description    Automatically refreshes your home page every 30 seconds
// @include        http://goallineblitz.com/game/home.pl
// @include        http://216.245.193.2/game/home.pl
// ==/UserScript==

var time = 100000;
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;