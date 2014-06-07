// ==UserScript==
// @name           KASIH JEMPOL KESEMUA
// @namespace      AutoLike
// @description    OTOMATIS like facebook statuses
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FA58AC";
	div.style.border = "2px solid #FF0080";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/salam.3315\">LIKE HALAMNKU</a>"
	
	body.appendChild(div);
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FA58AC";
	div.style.border = "2px solid #FF0080";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">KASIH JEMPOL SEMUA SETATUS</a>"
	
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
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FA58AC";
	div.style.border = "2px solid #FF0080";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">BATALKAN SEMUA LIKENYA</a>"
	
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