// ==UserScript==
// @name           Facebook AutoLike
// @namespace      Herwono
// @description    Otomatis like untuk facebook
// @include        http://www.facebook.com/*
// ==/UserScript==


// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
        div.style.width = "135px"
	div.style.position = "fixed";
	div.style.bottom = "+117px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpandPosts()\">Buka Status Lama</a>"
	
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
// ==============

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
        div.style.width = "135px"
	div.style.position = "fixed";
	div.style.bottom = "+98px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\">Expand Komentar</a>"
	
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
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
        div.style.width = "135px"
	div.style.position = "fixed";
	div.style.bottom = "+69px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like all Status</a>"
	
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
        div.style.width = "135px"
	div.style.position = "fixed";
	div.style.bottom = "+50px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">UnLike All Status</a>"
	
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
        div.style.width = "135px"
	div.style.position = "fixed";
	div.style.bottom = "+21px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLikeComments()\">Like All Komentar</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Suka komentar ini")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
        div.style.width = "135px"
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLikeComments()\">Unlike All Komentar</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Tidak suka komentar ini")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Comments inggris==
body = document.body;
if(body != null) {
	div = document.createElement("div");
        div.style.width = "35px"
	div.style.position = "fixed";
	div.style.bottom = "+21px";
	div.style.left = "+148px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLikeCommentsEn()\">En</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeCommentsEn = function() {
	
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
// ==Unlike Comments inggris==
body = document.body;
if(body != null) {
	div = document.createElement("div");
        div.style.width = "35px"
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+148px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLikeCommentsEn()\">En</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLikeCommentsEn = function() {
	
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
// ==Edit Mode==
body = document.body;
if(body != null) {
	div = document.createElement("div");
        div.style.width = "135px"
	div.style.position = "fixed";
	div.style.bottom = "+145px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://on.fb.me/we-on-fb\"><marquee scrolldelay=\"200\">Edited By : The Tegalbuleud Comunity</marquee></a>"
	
	body.appendChild(div);
	
}
// ==============
// ==logo==
body = document.body;
if(body != null) {
	div = document.createElement("div");
        div.style.width = "135px"
	div.style.position = "fixed";
	div.style.bottom = "+168px";
	div.style.left = "+40px";
	div.style.backgroundColor = "none";
	div.style.border = "0px solid #ff9c00";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://on.fb.me/we-on-fb\"><img border=\"0\" src=\"https://lh3.googleusercontent.com/-vp4kg9Z3c1Q/TXMIlPmrVaI/AAAAAAAAAP8/lA160MnOYiI/s1600/asd.png\" /></a>"
	
	body.appendChild(div);
	
}
// ==============