// ==UserScript==
// @name           GLB Forum Main Page Auto-Refresh/Reload (2 1/2 Minute Version)
// @namespace      GLB
// @description    Automatically refreshes the Main Forum page every 2 1/2 minutes (which is good enough for most users).
// @include        http://goallineblitz.com/game/forum_main.pl
// @include        http://216.245.193.2/game/forum_main.pl
// ==/UserScript==

var time = 150000; //= 2.5minutes			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;