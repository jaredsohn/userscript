// ==UserScript==
// @name        testSpace
// @namespace   myHowrse
// @include     http://www.howrse.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @version     1
// ==/UserScript==
		   
	$("#menu a[class*='highlight']").each(function()
	{
		$(this).attr('onclick', $(this).attr('onmouseover'));
		$(this).removeAttr('onmouseover')
	}
	);






