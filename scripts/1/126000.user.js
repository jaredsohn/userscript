// ==UserScript==
// @name           Auto like (irfankhanafi.blogspot.com)
// @namespace      irfankhanafi.blogspot.com
// @description    auto like facebook
// @include        http://www.facebook.com/
// ==/UserScript==

// ==============
// ==Like All Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.bottom = "+6px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#3d85c6";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "5px";
	div.innerHTML = "<a style=\"font-weight:bold;color:white\" href=\"JavaScript:AutoLike()\">Like all status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLaik = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}