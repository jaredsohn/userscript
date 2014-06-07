// ==UserScript==
// @name          Disable Backspace
// @namespace     http://www.userscripts.org/user/MrMagical
// @description   Disables backspace
// @include       *
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