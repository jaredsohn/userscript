// ==UserScript==
// @name           Facebook AutoLike. By Dhedhe A. Wibowo
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+65px";
	div.style.left = "+6px";
	div.style.backgroundColor = "transparent";
	div.style.border = "2px solid transparent";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#0000FF\" href=\"http://www.facebook.com/DCLXVI.Dhedhe666\">[Dhedhe A. Wibowo]</a>"
	
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
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "transparent";
	div.style.border = "2px solid transparent";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#0000CD\" href=\"JavaScript:AutoLike()\">[Brutality of Like]</a>"
	
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