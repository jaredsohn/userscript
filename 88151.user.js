// ==UserScript==
// @name        getup.com.ua helper for Opera 9/10, GreaseMonkey and Chrome
// @version     1.1
// @date        6.01.2011
// @author      ki0 <ki0@ua.fm>
// @download	http://userscripts.org/scripts/source/88151.user.js
// @include	http://getup.com.ua/file/*
// @include	http://www.getup.com.ua/file/*
// ==/UserScript==

//start downloading automatically
var autostart = /*@Enable automatic downloading start@bool@*/ true/*@*/;

function Load(e){
	var downloadurl = document.getElementById("downloadurl");
	if (downloadurl != null)
	{
		if ( document.getElementById("downloadfile") )
			document.getElementById("downloadfile").style.display = '';
		if (autostart)
			document.location.href = downloadurl.value;
		downloadfile = document.getElementById("downloadfile");
		if (downloadfile)
		{
			list = downloadfile.getElementsByTagName("a");
			if (list.length > 0)
				list[0].onclick = "";
		}
	}
	var dl = document.getElementById("dl");
	if (dl != null)
	{
		var list = document.getElementsByName("entryform1");
		if (list.length > 0)
		{
			list[0].target = "";
		}
		dl.click();
	}
};

window.addEventListener('load', Load, false);



