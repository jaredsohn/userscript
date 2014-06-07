// ==UserScript==
// @name           like by raxOr
// @namespace      roBOT
// @description    like smua status facebook dengan hanya sekali klick 
// @include        http://www.facebook.com/*
// @exclude        http://apps.facebook.com/*
// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FFFFFF";
	div.style.border = "2px solid #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FF0000\" href=\"JavaScript:AutoLike()\">Like Smua Status</a>"
	
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
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FFFFFF";
	div.style.border = "2px solid #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FF0000\" href=\"JavaScript:AutoUnLike()\">Gx Jdi ngeLike Smua Status</a>"
	
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