// ==UserScript==
// @name        Adopte Un Mec - Google Image Checker
// @namespace   ploufka
// @include     http://www.adopteunmec.com/*profile/*
// @grant	none
// @version     1.2
// ==/UserScript==

jQuery( function()
{
	$("div#modalWrapper > div.pict > div.pic > img.currentPicture").live( "mouseup", function( e )
	{
		if( e.button != 0 )
		{
			window.open( "https://www.google.fr/searchbyimage?image_url=" + encodeURIComponent( $(this).attr("src") ), "_newtab" );
		}
	} );
} );
