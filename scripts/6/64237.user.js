// ==UserScript==
// @name          Universal Random Reload
// @description   Universal Random Reload
// @include       http://*

// ==/UserScript==


var ONESEC   = 1000 ;				// Eine Sekunde (in ms)
var ONEMIN = (Math.round(1+60*(Math.random()))) * ONESEC ;		// Eine Minute (in ms)
var INTERVAL = (Math.round(1+9*(Math.random()))) * ONEMIN ;			// Wie oft wird Seite aktualisiert (in ms) 1-9min eingestellt
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;