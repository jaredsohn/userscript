// ==UserScript==
// @name        OpenSubtitles
// @namespace   mezb
// @description Auto Uncheck Download Manager that asks for executable download instead of the zip subtitle
// @include     http://www.opensubtitles.org/*
// @include     http://www.opensubtitles.us/*
// @version     1
// ==/UserScript==

var url = window.location.href;


if (url.match(".org")) {
	
	var check = document.getElementById("cbDownloader").checked;
	if(check) {
		document.getElementById("cbDownloader").checked = false;
		//auto-download
		//var a = document.getElementsByClassName("bt-dwl")[0];
		//location.assign( "javascript:" + a.getAttribute("href") + ";void(0)" );
	}

} else if(url.match(".us")) {
	
	document.getElementsByTagName("a")[0].click();
	
}
