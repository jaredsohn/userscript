// ==UserScript==
// @name           Reload finance page
// @namespace      GLB
// @description    Reload finance page 
// @include        http://goallineblitz.com/game/team_finances.pl?team_id=*
// ==/UserScript==

var time = 60000; //= 1minute			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;