// ==UserScript==
// @name           Facebook Oto Begen
// @namespace      Isa Öztürk
// @description    Otomatik Durum ve Yorum Begenme
// @include        http://www.facebook.com/*
// 25/july/2011
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "green";
	div.style.border = "2px solid red";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:black\" href=\"/DeLiFiseK41\">Buraya Tıkla</a>"
	
	body.appendChild(div);
}
// ==============
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "green";
	div.style.border = "2px solid red";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:black\" href=\"JavaScript:AutoExpand()\">Yorumlarin Tümünü Gör.</a>"
	
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
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "green";
	div.style.border = "2px solid red";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:black\" href=\"JavaScript:AutoLike()\">Tüm Durumlari Begen.</a>"
	
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
// ==SPhoto==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "green";
	div.style.border = "2px solid red";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:black\" href=\"JavaScript:AutoLikePhoto()\">Tüm Durumlari Begen.</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikePhoto = function() {
	
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
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "green";
	div.style.border = "2px solid red";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:black\" href=\"JavaScript:AutoUnLike()\">Tüm Durumlari Begenmekten Vazgec.</a>"
	
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
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "green";
	div.style.border = "2px solid red";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:black\" href=\"JavaScript:AutoLikeComments()\">Tüm Yorumlari Begen.</a>"
	
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
// ==Unlike Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "green";
	div.style.border = "2px solid redd,";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:black\" href=\"JavaScript:AutoUnLikeComments()\">Tüm Yorumlari Begenmekten Vazgeç.</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Unlike this comment")
					buttons[i].click();
		}
		
	};
}
// ==============