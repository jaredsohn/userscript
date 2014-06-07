// ==UserScript==
// @name        douban-style
// @namespace   http://userscripts.org/users/521209
// @include     http://*.douban.com/*
// @include     https://github.com/*
// @include     http://movie.douban.com/*
// @include     https://*.facebook.com/*
// @version     1.211
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
	// 改变小组推荐的位置
	article=document.getElementsByClassName("article");
	if (article) {
		article = article[0];
		gb=document.getElementsByClassName("group-board")[0];
		gt=document.getElementById("group-topics");
		article.insertBefore(gt, gb);
		// 话题搜索提前
		gt.insertBefore(gt.getElementsByClassName("group-topic-search")[0],gt.childNodes[0]);
	};
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


if (document.location.hostname.indexOf('github.com') >= 0) {
	github();
}

if (document.location.hostname.indexOf('www.facebook.com') >= 0)  {
	facebook();
}

if (document.location.hostname.indexOf('douban.com') >= 0)  {
	douban();
}
