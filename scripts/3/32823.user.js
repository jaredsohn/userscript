// ==UserScript==
// @name           Outwar imacros fix
// @namespace      firefox/id6c49ly.default/gm_scripts/Outwar_imacros_fix/Outwar\/imacros\/fix.user.js
// @description    fix for loading error 802 on imacros
// @include        http://*.outwar.com/*
// ==/UserScript==


var time = 60000; //= 1minutes			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;
