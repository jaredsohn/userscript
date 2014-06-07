// ==UserScript==
// @name           Facebook Autolike
// @namespace      Autolike
// @description    Untuk Facebook Autolike / Like All Status
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #009cff";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like All Status</a>"
	
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
// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+16px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #009cff";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/Khamiem.Rezpector\">By: Khamiem Ali Hussain AL-Jihadz</a>"
	
	body.appendChild(div);
}
// ==============
