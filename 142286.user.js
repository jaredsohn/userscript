// ==UserScript==
// @name           AutoLike
// @namespace      Facebook AutoLike
// @description    One click to like all facebook Friend Post and comment
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @icon	   http://b2nplen.netai.net/images/likev.gif
// @include	   http://www.facebook.com/*
// @include	   https://www.facebook.com/*
// @exclude	   htt*://developers.facebook.com/*
// @version        25-08-2012
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+15px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\"><img src=http://b2nplen.netai.net/images/likev.gif height=20 width=20 alt='Like Post or Status' title='Like Post or Status'</img></a>"
	
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