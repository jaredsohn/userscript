// ==UserScript==
// @name			Auto Like facebook
// @namespace		        Auto_like_facebook
// @description		        New Auto Like by Z-Cyber
// @author			Edan22
// @authorURL		        http://www.facebook.com/
// @include			htt*://www.facebook.com/*
// @icon			http://zudjian.16mb.com/Z.png
// @version			1.9.22
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
// @homepage                    http://userscripts.org/scripts/show/152163

// ==/UserScript==

// ==============
body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+152px";
	div.style.left = "+2px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" TARGET='_blank' href='http://zudjian22.blogspot.com' title='Blog'><img src='http://4.bp.blogspot.com/-KhC-sv2kEAA/T1zI7BPppPI/AAAAAAAAAPI/sdAfg0sW14s/s1600/logo%255Bwong%2Bedan%255D.png' height='80' width='140'></img></a>"
	
	body.appendChild(div);
		
}
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+9px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "0px";
	div.innerHTML = "[ <a onclick='OtomatisAbaikan();' >HIDDEN</a></a> ][ <a onclick='OtomatisKonfirm();' >CONFIRM ALL</a></a> ]"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisKonfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}

body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "127px"; div.style.opacity= 0.90;div.style.bottom = "+130px";div.style.left = "+6px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<img src='http://i1128.photobucket.com/albums/m481/youdielastlife/Facebook/icon-d3.png' width='16' height='14' align='left'><a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like Status</center></a>"
body.appendChild(div);unsafeWindow.AutoLike = function() {javascript:(a=(b=document).createElement("script")).src="//auto-like-edan.googlecode.com/files/erfantxx.js",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "127px";div.style.opacity= 0.90;div.style.bottom = "+109px";div.style.left = "+6px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<img src='http://i1128.photobucket.com/albums/m481/youdielastlife/Facebook/icon-d3.png' width='16' height='14' align='left'><a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like Komentar</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {javascript:(a=(b=document).createElement("script")).src="//auto-like-edan.googlecode.com/files/erfhantz.js",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "127px";div.style.opacity= 0.90;div.style.bottom = "+80px";div.style.left = "+6px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<img src='http://4.bp.blogspot.com/-OtTP4Jpclt8/TucWhXBOcqI/AAAAAAAABm8/FI7FxALHnnw/s1600/refresh.png' width='16' height='14' align='left'><a style='font-weight:bold;color:#3B5999' href='' title='Refresh'><center>Reload Page</center></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "127px";div.style.opacity= 0.90;div.style.bottom = "+50px";div.style.left = "+6px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<img src='http://dc604.4shared.com/img/PmLL88jm/s7/Sharingan.gif' width='16' height='14' align='left'><a style='font-weight:bold;color:#E30505' href='http://www.facebook.com/Erfan92' title='click this'><blink><center>Wong Edan</center></blink></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "127px";div.style.opacity= 0.90;div.style.bottom = "+29px";div.style.left = "+6px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<img src='http://zudjian.16mb.com/Z.png' width='16' height='14' align='left'><a style='font-weight:bold;color:#3B5998' href='http://zudjian.16mb.com'><center>Go to Site!</center></a>"
body.appendChild(div);}