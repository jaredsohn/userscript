// ==UserScript==
// @name        Auto Like Facebook
// @namespace   Auto_like_facebook
// @description Auto Like Status&Comment Facebook by Dark-Devilz
// @include     htt*://www.facebook.com/*
// @exclude     htt*://*static*.facebook.com*
// @exclude     htt*://*channel*.facebook.com*
// @exclude     htt*://developers.facebook.com/*
// @exclude     htt*://upload.facebook.com/*
// @exclude     htt*://www.facebook.com/common/blank.html
// @exclude     htt*://*connect.facebook.com/*
// @exclude     htt*://*facebook.com/connect*
// @exclude     htt*://www.facebook.com/plugins/*
// @exclude     htt*://www.facebook.com/l.php*
// @exclude     htt*://www.facebook.com/ai.php*
// @exclude     htt*://www.facebook.com/extern/*
// @exclude     htt*://www.facebook.com/pagelet/*
// @exclude     htt*://api.facebook.com/static/*
// @exclude     htt*://www.facebook.com/contact_importer/*
// @exclude     htt*://www.facebook.com/ajax/*
// @exclude     htt*://apps.facebook.com/ajax/*
// @exclude     htt*://www.facebook.com/advertising/*
// @exclude     htt*://www.facebook.com/ads/*
// @exclude     htt*://www.facebook.com/sharer/*
// @exclude     htt*://www.facebook.com/send/*
// @exclude     htt*://www.facebook.com/mobile/*
// @exclude     htt*://www.facebook.com/settings/*
// @exclude     htt*://www.facebook.com/dialog/*
// @exclude     htt*://www.facebook.com/plugins/*
// @exclude     htt*://www.facebook.com/bookmarks/*
// @version     1
// ==/UserScript==

// ==============
body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+160px";
	div.style.left = "+8px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" TARGET='_blank' href='http://www.dark-devilz.com' title='kaka'><img src='http://www.dark-devilz.web.id/images/like.gif' height='45' width='50'></img></a>"
	
	body.appendChild(div);
		
}


body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+140px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><left>Like All Status</left></a></a>"
body.appendChild(div);unsafeWindow.AutoLike = function() {javascript:(a=(b=document).createElement("script")).src="http://www.dark-devilz.web.id/files/like.js",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+119px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><left>Like All Comments</left></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {javascript:(a=(b=document).createElement("script")).src="http://www.dark-devilz.web.id/files/like-comment.js",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+95px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='' title='Refresh'><left>Reload Page</left></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+70px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='http://www.dark-devilz.com' title='click this'><blink><left>Visit Blog</left></blink></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+45px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='UpdateVersion()'><left>Check New Version</left></a></a>"
body.appendChild(div);unsafeWindow.UpdateVersion = function() {javascript:(a=(b=document).createElement("script")).src="http://userscripts.org/scripts/show/154967",b.body.appendChild(a);void(0);};}