// ==UserScript==
// @name           Facebook AutoLike
// @author         Sindhu Pripamungkas (VinZy)
// @site           http://Sindprip.blogspot.com
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://*.facebook.com/*, https://*.facebook.com/*,
// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+5px";
	div.style.left = "+5px";
	div.style.backgroundColor = "#333333";
	div.style.border = "2px solid #cf0000";
	div.style.padding = "2px"
	div.innerHTML = "<a style=\"font-weight:bold;color:red\" href=\"JavaScript:AutoLike()\">Like Status</a>"
	
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
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+5px";
	div.style.left = "+80px";
	div.style.backgroundColor = "#333333";
	div.style.border = "2px solid #cf0000";
	div.style.padding = "2px"
	div.innerHTML = "<a style=\"font-weight:bold;color:red;\" href=\"JavaScript:AutoLikeComments()\">Like Comment</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==UserScript==
// @name           Facebook AutoLike
// @author         Sindhu Pripamungkas (VinZy)
// @site           http://Sindprip.blogspot.com
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/*, http://facebook.com/*,
// ==/UserScript==


// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+5px";
	div.style.left = "+5px";
	div.style.backgroundColor = "#333333";
	div.style.border = "2px solid #cf0000";
	div.style.padding = "2px"
	div.innerHTML = "<a style=\"font-weight:bold;color:red\" href=\"JavaScript:AutoLike()\">Like Status</a>"
	
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
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+5px";
	div.style.left = "+80px";
	div.style.backgroundColor = "#333333";
	div.style.border = "2px solid #cf0000";
	div.style.padding = "2px"
	div.innerHTML = "<a style=\"font-weight:bold;color:red;\" href=\"JavaScript:AutoLikeComments()\">Like Comment</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+5px";
	div.style.left = "+173px";
	div.style.backgroundColor = "#333333";
	div.style.border = "2px solid #cf0000";
	div.style.padding = "2px"
	div.innerHTML = "<a style=\"font-weight:bold;color:red;\" href=\"JavaScript:AutoExpand()\">Expand Comments</a>"
	
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