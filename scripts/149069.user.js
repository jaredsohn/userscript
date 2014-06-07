// ==UserScript==
// @name        PUT THAT reblog BACK
// @namespace   http://userscripts.org/users/476660
// @description DO IT
// @include     http://www.tumblr.com/blog/*

// @include     http://www.tumblr.com/dashboard

// @include     http://www.tumblr.com/dashboard/*

// @include     http://www.tumblr.com/show/*
// @grant none
// ==/UserScript==

var liPosts = document.getElementsByTagName('li');
var last_check = 0;
  
function check_for_saving() {
	for (var i=last_check;i<liPosts.length;i++) {
		if (liPosts[i].id.substring(0,4)=='post' && liPosts[i].className.indexOf('not_mine') >= 0) {
	document.body.innerHTML = document.body.innerHTML.replace('<span class="reblog_icon">reblogged</span>','reblogged');
		}
	}
	last_check = liPosts.length;
}

setInterval(check_for_saving, 200);