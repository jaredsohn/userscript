// ==UserScript==
// @name        douban-style
// @namespace   http://userscripts.org/users/521209
// @include     https://github.com/*
// @include     http://*.douban.com/*
// @include     https://*.facebook.com/*
// @version     1.21
// ==/UserScript==

var bcolor = "#E8D098";
var fcolor = "#111111";


function github (argument) {
	document.body.style.background=bcolor; 
	var nav= document.body.getElementsByClassName("header header-logged-in true");
	if (nav){
		nav[0].style.background=bcolor;
	}
}

// set comments background color
function douban (argument) {
	document.body.style.background=bcolor; 
	// document.body.style.color=fcolor; 
	var lis = document.body.getElementsByClassName("clearfix comment-item");
	for (var i = lis.length - 1; i >= 0; i--) {
		lis[i].style.background=bcolor;
		// lis[i].style.color=fcolor;
	}
	var nav= document.body.getElementsByClassName("nav-wrap");
	if (nav){
		nav[0].style.background=bcolor;
	}
}

// for facebook
function facebook (argument) {
	document.body.style.background=bcolor; 
	// document.body.style.color=fcolor; 
	var fb = document.getElementById("contentCol");
	if (fb) {
		fb.style.background=bcolor;
	}
}


if (document.location.hostname == 'github.com') {
	github();
}

if (document.location.hostname == 'www.facebook.com') {
	facebook();
}

if (document.location.hostname == 'www.douban.com') {
	douban();
}
