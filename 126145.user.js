// ==UserScript==
// @name           Facebook Auto Like Simple Style https by dede
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        https://www.facebook.com/*
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
	div.innerHTML = "<a style=\"font-weight:bold;color:#1686c5\" href=\"JavaScript:AutoLike()\">Like Semua Kiriman</a>"
	
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
	div.style.left = "+130px";
	div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
	div.style.bordercolor = "rgba(0, 0, 0, 0.2)";
	div.style.border = "1px solid";
	div.style.padding = "5px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#1686c5\" href=\"http://www.facebook.com/dede.al.mustaqim\" target=\"new\">Dede Tbs</a>"
	
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
