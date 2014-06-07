// ==UserScript==
// @name           Facebook Suka Suka By Kang Obing
// @namespace      FB-Suka
// @description    Suka Untuk Semua
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

// ==============
// ==SUKA STATUS==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.right = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">SUKA STATUS</a>"
	
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
// ==BATAL SUKA STATUS==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+52px";
	div.style.right = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">BATAL SUKA</a>"
	
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