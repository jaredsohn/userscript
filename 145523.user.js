// ==UserScript==
// @name		Auto Like Facebook By. Rizky-Cyber - ╣ Cyber ¢ Indonesia ╠
// @namespace		auto_like_facebook
// @description		Like status dan Dinding Facebook hanya dengan Sekali Klik, Bomber Like menjadikan ribuan jempol melayang di status anda.
// @author		https://www.facebook.com/XshotHarlemHat
// @homepage		https://www.facebook.com/XshotHarlemHat
// @homepage		https://www.facebook.com/XshotHarlemHat
// @include		htt*://www.facebook.com/*
// @icon		http://i1190.photobucket.com/albums/z445/ichandkusuma/berbagijempol.jpg
// @version		1.4.5
// @exclude		htt*://*static*.facebook.com*
// @exclude		htt*://*channel*.facebook.com*
// @exclude		htt*://developers.facebook.com/*
// @exclude		htt*://upload.facebook.com/*
// @exclude		htt*://www.facebook.com/common/blank.html
// @exclude		htt*://*connect.facebook.com/*
// @exclude		htt*://*acebook.com/connect*
// @exclude		htt*://www.facebook.com/plugins/*
// @exclude		htt*://www.facebook.com/l.php*
// @exclude		htt*://www.facebook.com/ai.php*
// @exclude		htt*://www.facebook.com/extern/*
// @exclude		htt*://www.facebook.com/pagelet/*
// @exclude		htt*://api.facebook.com/static/*
// @exclude		htt*://www.facebook.com/contact_importer/*
// @exclude		htt*://www.facebook.com/ajax/*
// @exclude 		htt*://apps.facebook.com/ajax/*
// @exclude		htt*://www.facebook.com/advertising/*
// @exclude		htt*://www.facebook.com/ads/*
// @exclude		htt*://www.facebook.com/sharer/*
// @exclude		htt*://www.facebook.com/send/*
// @exclude		htt*://www.facebook.com/mobile/*
// @exclude		htt*://www.facebook.com/settings/*
// @exclude		htt*://www.facebook.com/dialog/*
// @exclude		htt*://www.facebook.com/plugins/*

// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+130px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"javascript:AutoLike()\"> |- Like All Status[JKT48]Rizky Love Nabilah JKT48 -| </a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+110px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\"> | Unlike All Status[JKT48]Rizky Love Nabilah JKT48 | </a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		
		}
		
	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+90px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"https://www.facebook.com/XshotHarlemHat/\">| = [JKT48]Rizky Love Nabilah JKT48 = |</a>"

	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+65px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\http://staic.qefeng.com/Kindeditor/attached/file/20120803/20120803215420_52906.html\">|Creted by Rizky-Hacked Indo |</a>"

	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"https://www.facebook.com/XshotHarlemHat\">| = Rizky-Cyber-Indo = |</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}

	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"https://www.facebook.com/XshotHarlemHat\">|+++ Thx To All Cyber JKT48 +++|</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}
		
	};
}
// ==============