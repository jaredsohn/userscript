// ==UserScript==
// @name           TSR first unread post
// @namespace      http://www.donthaveone.co.uk
// @include        http://www.thestudentroom.co.uk/*
// @include        http://*www.thestudentroom.co.uk/*
// ==/UserScript==
// Made by Creole 

function urlSwitch() {
	var url = location.href;
	var urlLength = url.length;

	var post = "#post";
	var edit = "#edit";

	var postBeginLocation = url.indexOf(post);
	var editBeginLocation = url.indexOf(edit);

	if ( postBeginLocation != "-1") {
		var postId = url.substr(postBeginLocation+5,urlLength);
	
		var newUrl = url.substr(0,postBeginLocation)+edit+postId;
	
		window.location.href = newUrl;
	}
	
	if ( editBeginLocation != "-1") {
		window.location.href = url;
	}
}


window.addEventListener('load',
	function() {
		setTimeout(urlSwitch(),1);
	},
	false);