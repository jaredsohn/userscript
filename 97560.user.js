// ==UserScript==
// @name          Refresh
// @description	  Refresh
// @include       http://www.roblox.com/Forum/ShowPost.aspx?PostID=42897868
// ==/UserScript==
//
var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = .00000000000000000001 * ONEMIN ;			// How often is page refreshed (in ms)
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL

