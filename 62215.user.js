// ==UserScript==
// @name         OGame: Research and Building on Top
// @namespace    Vess
// @description  This script shows the currently ongoing research or the building currently being built on the top of the page.
// @version      1.01
// @date         2009-11-18
// @include      http://uni*.ogame.*/game/index.php?page=buildings*&mode=Forschung*
// @include      http://uni*.ogame.*/game/index.php?page=b_building*
// @exclude      http://uni42.ogame.org/*
// @exclude      http://uni6.ogame.de/*
// @exclude      http://a*.ogame.*
// @exclude      http://b*.ogame.*
// @exclude      http://c*.ogame.*
// @exclude      http://d*.ogame.*
// @exclude      http://e*.ogame.*
// @exclude      http://f*.ogame.*
// @exclude      http://g*.ogame.*
// @exclude      http://h*.ogame.*
// @exclude      http://i*.ogame.*
// @exclude      http://j*.ogame.*
// @exclude      http://k*.ogame.*
// @exclude      http://l*.ogame.*
// @exclude      http://m*.ogame.*
// @exclude      http://n*.ogame.*
// @exclude      http://o*.ogame.*
// @exclude      http://p*.ogame.*
// @exclude      http://q*.ogame.*
// @exclude      http://r*.ogame.*
// @exclude      http://sirius*.ogame.*
// @exclude      http://t*.ogame.*
// @exclude      http://ursa*.ogame.*
// @exclude      http://v*.ogame.*
// @exclude      http://w*.ogame.*
// @exclude      http://x*.ogame.*
// @exclude      http://y*.ogame.*
// @exclude      http://z*.ogame.*
// ==/UserScript==

(function ()
{
	var url = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (((url.indexOf ('/game/index.php?page=buildings') != -1) && (url.indexOf ('&mode=Forschung') != -1)) ||
	    (url.indexOf ('/game/index.php?page=b_building') != -1))
	{
		var running = document.getElementById ('bxx').parentNode.parentNode;
		var index = (url.indexOf ('/game/index.php?page=b_building') != -1) ? 0 : 1;
		if (running)
			running.parentNode.insertBefore (running, running.parentNode.rows [index]);
	}
}
)();
