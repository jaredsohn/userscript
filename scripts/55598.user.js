// ==UserScript==
// @name		FurAffinity.net Autoscroller
// @author		Anthony Myre
// @namespace		http://tonyfox.ws/
// @description		Automatically scrolls down to the top of the submission image on FurAffinity.net
// @version		2.0
// @include		http://*furaffinity.net/view/*
// @include		http://*furaffinity.net/full/*
// ==/UserScript==


document.addEventListener("DOMContentLoaded",function()
{
	window.scroll(0,0);
	var curleft = curtop = 0;
	if (document.getElementById("submissionImg"))
	{
		var obj = document.getElementById("submissionImg");
		if (obj.offsetParent)
		{
			do
			{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}
			while (obj = obj.offsetParent);
		}
		window.scrollBy(curleft - 5,curtop - 5);
	}
},false);