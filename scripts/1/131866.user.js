// ==UserScript==
// @name           Facebook AutoLike++ Ntc-Rn
// @include        http://www.facebook.com/
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/#
// @include        http://facebook.com/
// @include        http://facebook.com/#
// @include        http://www.facebook.com/
// @include        http://facebook.com/*
// ==/UserScript==
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style._position = "absolute";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/naufal.azkia\">Me : <blink><font color=#FF0009>Rn Naufal Azkia</font></blink></a>"
	
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
// ==Expand Status lama==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style._position = "absolute";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://ntc-rn.tk\">NTC-RN Website</a>"
	
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
// ==Expand Status lama==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style._position = "absolute";
	div.style.bottom = "+32px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://ntc-rn.tk/page.html\">Rn Power Like</a>"
	
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
// ==Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style._position = "absolute";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Jempol Semua Status</a>"
	
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
// ==Unlike Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style._position = "absolute";
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">Unlike Semua Status</a>"
	
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
// ==============
// ==Confirm Semua==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like8');
div.style.position = "fixed";
div.style._position = "absolute";
div.style.display = "block";
div.style.opacity= 0.90;
div.style.bottom = "+2px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' ><b>Konfirmasi Semua Permintaan Teman</b></a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' ><b>Abaikan Semua Permintaan Pertemanan</b></a>"

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

// ==============