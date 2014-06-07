// ==UserScript==
// @name           Facebook Auto Like new style v.01 bY Faiz
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+6px";
	div.style.left = "+6px";
	div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
	div.style.bordercolor = "rgba(0, 0, 0, 0.2)";
	div.style.border = "1px solid";
	div.style.padding = "5px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like Semua Kiriman</a>"
	
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


// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+6px";
	div.style.left = "+110px";
	div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
	div.style.bordercolor = "rgba(0, 0, 0, 0.2)";
	div.style.border = "1px solid";
	div.style.padding = "5px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/profile.php?id=100000593976869">Faiz VanBaaurent</a>"
	
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

