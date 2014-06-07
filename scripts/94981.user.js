// ==UserScript==
// @name New Twitter Interface Fix
// @description Hides the line switching to the new Twitter interface.
// @namespace http://twitter.com/dmitrymankoff
// @version 1.1
// @license MIT License
// ==/UserScript==



function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}



function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


function eraseCookie(name) {
	createCookie(name,"",-1);
}


$(document).ready(function(){
	
	createCookie("twitswitch", "1", 356)
	$('.fixed-banners').remove();
	$('.phoenix-skybar').removeClass('phoenix-skybar');

})