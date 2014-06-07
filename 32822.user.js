// ==UserScript==
// @name           Outwar backup refresher
// @namespace      firefox/id6c49ly.default/gm_scripts/Outwar_backup_refresher/Outwar\/ibackup\/refresher.user.js
// @include        http://*.outwar.com/*
// ==/UserScript==

var time = 75000; //= 1.25minutes			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;
