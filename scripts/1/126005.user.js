// ==UserScript==
// @name           autolike (irfankhanafi.blogspot.com)
// @namespace      irfankhanafi.blogspot.com
// @description    Likes all Status Updates
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==


// ==Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+6px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#3d85c6";
	div.style.bordercolor = "red";
	div.style.border = "1px solid";
	div.style.padding = "5px";
	div.innerHTML = "<a style=\"font-weight:bold;color:white\" href=\"JavaScript:AutoLike()\">Like all status</a>"
	
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