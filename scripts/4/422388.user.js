// ==UserScript==
// @name        Howrse onMouseDown Menus
// @namespace   myHowrse
// @description Turns the 5 onmouseover menus into onmousedown menus
// @include     http://www.howrse.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @author      daexion
// @version     2
// ==/UserScript==
		   
$("#menu a[class*='highlight']").each(function()
{
	$(this).attr('onmousedown', $(this).attr('onmouseover'));
	$(this).removeAttr('onmouseover')
});