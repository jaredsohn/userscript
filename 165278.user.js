// ==UserScript==
// @name            Get rid of Veehd Vaudi plugin ad 
// @description	    Hides the Vaudi plugin 
// @namespace       JamesTodd
// @include         http://veehd.com/*
// @name           Get rid of Veehd Vaudi plugin ad 
// ==/UserScript==

function removeElementById( sId )
{
	if( document.getElementById( sId ) != null )
	{
		var banner = document.getElementById( sId );
		banner.parentNode.removeChild( banner );
	}
}

// Veehd Vaudi plugin
removeElementById( "_vdcbl" );