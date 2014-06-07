// ==UserScript==
// @name           Storg Mods
// @namespace      http://userscripts.org
// @description    Mod Storg
// @include        http://www.storg.net/
// ==/UserScript==

document.addEventListener('keypress',function(e)
{
	var char = getKey(e);
	if ( !links ) var links = document.getElementsByTagName('a');
	var plusHref, minusHref;
	for ( i in links )
	{
		if ( new RegExp("rate=u","i").test(links[i]) )
		{
			plusHref = links[i];
		}
		else if ( new RegExp("rate=d","i").test(links[i]) )
		{
			minusHref = links[i];
		}
	}
	if ( char == '+' )
	{
		document.location.href = plusHref;
	}
	else if ( char == '-' )
	{
		document.location.href = minusHref;
	}
	else if ( char == 'enter' )
	{
		document.location.href = "http://storg.net/";
	}
	return true;
}, true);

function getKey(e)
{
	var code;
	if ( !e )
	{
		var e = window.event;
	}
	if ( e.keyCode )
	{
		code = e.keyCode;
	}
	else if ( e.which )
	{
		code = e.which;
	}
	return ( code != 13 ? String.fromCharCode(code) : "enter" );
}