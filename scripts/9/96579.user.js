// ==UserScript==
// @name           Garrysmod Wiki Full Width
// @namespace      TurtleHax
// @description    Makes the garrysmod.com wiki size not look like it was designed for $50 monitors from 2002
// @include        http://wiki.garrysmod.com/*
// @match          http://wiki.garrysmod.com/*
// @run-at         document-start
// ==/UserScript==

if (typeof GM_addStyle === 'undefined')
{
	GM_addStyle = function(css)
	{
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};
}

GM_addStyle('body, #mw-head { left: 0 !important; margin-left: 0px !important; width: 100% !important; }');