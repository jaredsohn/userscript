// ==UserScript==
// @name           GameTap
// @namespace      http://www.gametap.com/
// @description    GameTap browser window resizer
// @include        http://www.gametap.com/games.html*
// @include        http://www.gametap.com/video-games/*
// ==/UserScript==

function maximize()
{
	window.moveTo(0,0);
	if (document.all) {
		top.window.resizeTo(screen.availWidth,screen.availHeight);
	} else if (document.layers||document.getElementById)
	{
		if (top.window.outerHeight<screen.availHeight||top.window.outerWidth<screen.availWidth)
		{
			top.window.outerHeight = screen.availHeight;
			top.window.outerWidth = screen.availWidth;
		}
	}
}

if( top.window.outerHeight > screen.availHeight )
{
	if( confirm("Your window is maximized. This could cause problems with GameTap games when pressing Escape.\n\nResize?") == true )
	{
		maximize();
	}
}