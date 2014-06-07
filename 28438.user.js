// Warbears Disable Backspace
// version 0.2 BETA!
// 2008-06-14
// Copyright (c) 2008, Mr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This userscript disables backspace on warbears.com outside the flash client to prevent going back by mistake
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Warbears Disable Backspace
// @namespace     http://www.userscripts.org/user/MrMagical
// @description   Disables backspace outside BTC on warbears.com
// @include       *warbears.com/bedtime*
// ==/UserScript==
   if (typeof window.event != 'undefined')
   	document.onkeydown = function()
   	{
   		var test_var=event.srcElement.tagName.toUpperCase();
   		if (test_var != 'INPUT' && test_var != 'TEXTAREA')
   			return (event.keyCode != 8);
   	}
   else
   	document.onkeypress = function(e)
   	{
  		var test_var=e.target.nodeName.toUpperCase();
   		if (test_var != 'INPUT' && test_var != 'TEXTAREA')
   			return (e.keyCode != 8);
   	}