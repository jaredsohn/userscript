// ==UserScript==
// @name           Auto Like Status Facebook
// @namespace      TheNamelessAccount
// @description    Likes all Post Updates
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+57px";
	div.style.left = "+7px";
	div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
	div.style.bordercolor = "rgba(0, 0, 0, 0.2)";
	div.style.border = "1px solid";
	div.style.padding = "5px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Hajar Gan</a>"
	
	body.appendChild(div);
	unsafeWindow.FloodWal = function() {
	};
}
// ==============
// ==Expand Older Posts==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+17px";
	div.style.left = "+7px";
	div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
	div.style.border = "1px solid";
	div.style.padding = "5px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/ipungblues\"> by seenthings blues </a>"
	
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