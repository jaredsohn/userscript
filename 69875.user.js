// JavaScript Document
// ==UserScript==
// @name		SCI Paging with Ctrl+arrow
// @description Use SCI paging with Ctrl+arrow buttons
// @author		Kain Haart <dev@mail.kain-haart.info>
// @namespace	http://projects.kain-haart.info/greasemonkey-scripts
// @include		*
// @exclude		http://habrahabr.ru/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require		http://jquerykeyboard.googlecode.com/hg/jquery.keyboard.js
// ==/UserScript==

//console.log("jquery keyboard: " + typeof($().keyboard));

if( typeof(unsafeWindow["SCI"])!="undefined" && typeof(unsafeWindow.SCI["paging"])!="undefined" )
	{
	if(typeof(unsafeWindow.SCI.paging['next']=="function"))
		{
		$(document).keyboard("ctrl+aright", function()
			{
			$("body").append('<script>SCI.paging.next();</script>');
			});
		}
	if(typeof(unsafeWindow.SCI.paging['prev']=="function"))
		{
		$(document).keyboard("ctrl+aleft", function()
			{
			$("body").append('<script>SCI.paging.prev();</script>');
			});
		}
	}