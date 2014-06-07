// ==UserScript==
// @name           Autolike by Mas Pithie
// @namespace      AutoLike
// @description    Autolike For Facebook
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        1.0
// ==/UserScript==

body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+50px";
	div.style.left = "+12px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" TARGET='_blank' href='http://www.facebook.com/tikuspithi'><img src='http://i1186.photobucket.com/albums/z371/maspithie/2.gif' height='30' width='120'></img></a>"
	
	body.appendChild(div);
		
}


body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+15px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\"><img src=http://i1142.photobucket.com/albums/n608/adiebshare/Like.png height=29 width=60 alt='Like Post or Status' title='Like Post or Status'</img></a>"
	
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
