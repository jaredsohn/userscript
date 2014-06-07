// ==UserScript==
// @name           ziionAutoLike,
// @namespace      AutoLiker
// @description    One click to like all facebook Friend Post and comment
// @include        *facebook.com/*
// @include        facebook.com*
// @include        *facebook.nl/*
// @include        facebook.nl*
// @include        *facebook.be/*
// @include        facebook.be*
// @version        1.3
// ==/UserScript==


body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+50px";
	div.style.left = "+12px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" href='http://www.facebook.com/ziion.mystic'>Zii.Like.You</a>"
	
	body.appendChild(div);
		
}


body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+14px";
	div.style.left = "+10px";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://i1176.photobucket.com/albums/x332/Flocker96/Blackground-fb-auto-liker.png' height='30' width=80'></img>"
	
	body.appendChild(div);
	
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+15px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\"><img src=http://i1176.photobucket.com/albums/x332/Flocker96/like.png height=20 width=20 alt='Like Post or Status' title='Like Post or Status'</img></a>"
	
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

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+40px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoExpand()\"><img src=http://i1176.photobucket.com/albums/x332/Flocker96/More.png height=20 width=20 alt='Expand Comment' title='Expand Comment'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all[1]")
					buttons[i].click();
		}
		
	};
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+65px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLikeC()\"><img src=http://i1176.photobucket.com/albums/x332/Flocker96/Com-like.png height=20 width=20 alt='Like Comment' title='Like Comment'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeC = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
	};
}