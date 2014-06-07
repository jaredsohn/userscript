// ==UserScript==
// @name           Unfollow TwittDat
// @namespace      TheNamelessAccount
// @description    Ewe
// @include        http://*.twitdat.com/*
// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:Unfollow()\">Unfollow all</a>"
	
	body.appendChild(div);
	
	unsafeWindow.Unfollow = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("delete_button") >= 0)
				if(buttons[i].getAttribute("class") == "delete_button")
					buttons[i].click();
		}
		
	};
}