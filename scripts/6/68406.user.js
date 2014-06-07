// ==UserScript==
// @name        filestore.com.ua helper for Opera 9/10 and GreaseMonkey
// @version     1.2.2
// @date        6.01.2011
// @author      ki0 <ki0@ua.fm>
// @download    http://userscripts.org/scripts/source/68406.user.js
// @include http://filestore.com.ua/*
// @include http://www.filestore.com.ua/*
// ==/UserScript==

//start downloading automatically
var autostart = /*@Enable automatic downloading start@bool@*/ true/*@*/;

window.addEventListener('load', function(e){
	var downloadfile = document.getElementById("downloadfile");
	if (downloadfile != null)
	{
		downloadfile.style.display = '';
		downloadfile.innerHTML = downloadfile.innerHTML.replace('document.location=', '\'</a><a href=');
		if (autostart)
			document.location.href = downloadfile.children[4].value;
	}
}, false);


