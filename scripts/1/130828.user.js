// ==UserScript==
// @name           Facebook AutoLike
// @namespace      Otolike
// @description    Otomatis like komen ataupun status (Skrip buatan Lionel, dirubah menjadi bahasa indonesia)
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#A9D0F5";
	div.style.border = "2px solid #045FB4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#045FB4\" href=\"/sky\">Created By : Lionel Sky<br><a style=\"font-weight:bold;color:#9FA801\" href=\"/Radis.3D\">Edited By:Radis 3D</a>"
	
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
	div.style.backgroundColor = "#FF99A0";
	div.style.border = "2px solid #045FB4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#045FB4\" href=\"JavaScript:AutoExpand()\">buka Semua Komentar</a>"
	
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
	div.style.backgroundColor = "#A0FF00";
	div.style.border = "2px solid #045FB4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#045FB4\" href=\"JavaScript:AutoLike()\">Like Semua Status</a>"
	
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
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#F90FF1";
	div.style.border = "2px solid #045FB4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#045FB4\" href=\"JavaScript:AutoUnLike()\">Unlike Semua Status</a>"
	
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
	div.style.backgroundColor = "#FAFA00";
	div.style.border = "2px solid #045FB4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#045FB4\" href=\"JavaScript:AutoLikeComments()\">Like Semua Komentar</a>"
	
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
	div.style.backgroundColor = "#A99F09";
	div.style.border = "2px solid #045FB4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#045FB4\" href=\"JavaScript:AutoUnLikeComments()\">Unlike Semua Komentar</a>"
	
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