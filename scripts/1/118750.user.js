// ==UserScript==
// @name           Auto Like On Post V.2.0 By Zhon
// @namespace      AutoLike
// @description    Automaticly like facebook on status
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==


// Created==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+116px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2B60DE\" href=\"/zhon.return\"> Created by Zhon </a>"
	
	body.appendChild(div);
}

// Like Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+91px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2B60DE\" href=\"JavaScript:AutoLike()\"> Like All Posts </a>"
	
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

// Unlike Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+68px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2B60DE\" href=\"JavaScript:AutoUnLike()\"> UnLike All Posts </a>"
	
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
// ==============
// ==Zhon-Return==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+45px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2B60DE\" href=\"http://zhonreturn.blogspot.com/\"> Zhon-Return </a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}

	};
}
// ==Update==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2B60DE\" href=\"http://userscripts.org/scripts/show/118767\"> Update </a>"

	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
// End==