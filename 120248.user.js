// ==UserScript==
// @name	ICE Megaupload Fix
// @version	1.1
// @namespace	http://icefilms.info
// @description	Fixed the megaupload check for size variables

// @include	http://www.icefilms.info/*video.php*

// @include	http://www.megaupload.com/*d=*
// @include	http://megaupload.com/*d=*

// @include	http://www.megaporn.com/*d=*
// @include	http://megaporn.com/*d=*

// @include	http://www.2shared.com/file/*
// @include	http://2shared.com/file/*
// @include	http://www.2shared.com/video/*
// @include	http://2shared.com/video/*

// ==/UserScript==

function gup(name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(location.href);
	if (results == null)
		return "";
	else
		return results[1];
}

// url params
var d = gup('d');

// url params
var w = gup('w');
var h = gup('h');

if (window.top == window.self){
  //don't run on the top window
    return;

}else if ((location.host.match('megaupload.com') || location.host.match('megaporn.com')) && location.href.match('\\?d=')){
	
	if(w||h) {
		location = "http://www.megaupload.com/?d="+d;
	}
	
}
