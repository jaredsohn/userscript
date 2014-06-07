// ==UserScript==
// @name           Likers Autolike
// @namespace      AutoLike
// @description    Otomatis like status
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+41px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#b0c4de";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#09010B\" href=\"http://www.facebook.com/pages/Likers/127249094057242\">By LIKERS</a>"
	
	body.appendChild(div);
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+21px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#b0c4de";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#010005\" href=\"JavaScript:AutoLike()\">Sukai semua</a>"
	
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
	div.style.bottom = "+1px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#b0c4de";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#010005\" href=\"JavaScript:AutoUnLike()\">Hapus Suka Kita</a>"
	
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