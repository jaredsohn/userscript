// ==UserScript==
// @name           AppShopper Screenshots
// @namespace      1
// @include        http://appshopper.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js
// Show all the screenshots from ImageArray.
// ==/UserScript==

if (typeof unsafeWindow.imgArray != 'undefined')
{
	//var ImageNode = $("#screenshots");
	for (i=1;i<unsafeWindow.imgArray.length;i++) 
	{ 
		n = document.createElement('img');
		n.src=unsafeWindow.imgArray[i][0];
		$("#screenshots").parent().append(n);
	}
	$("a[href='#']:has('img')").parent().parent().remove();
}   
