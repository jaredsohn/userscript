// ==UserScript==
// @name           Macro-Like
// @namespace      http://www.thekevindolan.com
// @description    Are you tired of micro-managing your likes? Just like it all and get it over with!
// @include        http://www.facebook.com/*
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "-1px";
	div.style.left = "20px";
	div.style.backgroundColor = "#ee5454";
	div.style.border = "1px solid #e7322e";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"JavaScript:macroLike()\">Macro-Like</a>"
	
	body.appendChild(div);
	
	unsafeWindow.macroLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}