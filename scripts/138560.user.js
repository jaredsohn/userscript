// ==UserScript==
// @name           Auto Like
// @namespace      Lynn-Hevea-gL4
// @description    Quickly Like All Status Instantly
// @include        http://www.facebook.com/*
// @include        https://*.facebook.com/*
// @version        v0.1
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.width = "66px"; 
	div.style.opacity = 1;
	div.style.bottom = "+530px";
	div.style.left = "+0px";
	div.style.backgroundColor = "#FFFFFF";
	div.style.border = "1px solid #00008B";
	div.style.padding = "4px";
	div.innerHTML = "<center><a style=\"font-weight:;color:#0000FF\" href=\"/Firman syah\">Add Me</a>"
	
	body.appendChild(div);
}
// ==Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.width = "66px"; 
	div.style.opacity = 1;
	div.style.bottom = "+510px";
	div.style.left = "+0px";
	div.style.backgroundColor = "#FFFFFF";
	div.style.border = "1px solid #00008B";
	div.style.padding = "4px";
	div.innerHTML = "<center><a style=\"font-weight:;color:#0000FF\" href=\"JavaScript:AutoLike()\">Like All 

Status</a>"
	
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