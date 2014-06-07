// ==UserScript==
// @name		InterfaceLIFT Autoselect Resolution
// @namespace	http://straylight.cz/userscripts/
// @description	Automatically select wallpaper resolution on InterfaceLIFT
// @version		0.1
// @date		2008-07-24
// @include		http://interfacelift.com/wallpaper*/*
// @include		http://*.interfacelift.com/wallpaper*/*
// ==/UserScript==

var resolution = false;
	// Replace false on the line above by target resolution, eg. '1024x768'

function changeResolutions()
{
	if(!resolution)
		resolution = screen.width+'x'+screen.height;
	
	// TODO: Don't use unsafeWindow
	var selects = unsafeWindow.document.getElementsByName('resolution');
	if(selects.length==0)
		return;
	
	for(var i = 0; i < selects.length; i++)
	{
		sel = selects[i];
		sel.value = resolution;
		sel.onchange();
	}
}

window.addEventListener('load', changeResolutions, true);
