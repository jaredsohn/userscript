// ==UserScript==
// @name           Facebook AutoLike
// @author         Sindhu Pripamungkas (VinZy)
// @site           http://Sindprip.blogspot.com
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/*, http://facebook.com/*,
// ==/UserScript==

// ==Background==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+1px";
	div.style.left = "+1px";
	div.innerHTML = "<img src=\"http://www.clker.com/cliparts/k/f/K/B/u/r/blue-3d-rectangle-hi.png\" height=\"30\" width=\"157\"/>"
	
	body.appendChild(div);
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+9px";
	div.style.left = "+15px";
	div.innerHTML = "<a href=\"JavaScript:AutoExpand()\"><img src=\"http://sindhups.comli.com/Facebook/comment.png\"/></a>"
	
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
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+8px";
	div.style.left = "+37px";
	div.innerHTML = "<a href=\"JavaScript:AutoExpandPosts()\"><img src=\"http://sindhups.comli.com/Facebook/wall.png\"/></a>"
	
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
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+9px";
	div.style.left = "+59px";
	div.innerHTML = "<a href=\"JavaScript:AutoLike()\"><img src=\"http://sindhups.comli.com/Facebook/likestatus.png\"/></a>"
	
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
	div.style.bottom = "+8px";
	div.style.left = "+81px";
	div.innerHTML = "<a href=\"JavaScript:AutoLikeComments()\"><img src=\"http://sindhups.comli.com/Facebook/likecomment.png\"/></a>"
	
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
// ==Author Facebook==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+8px";
	div.style.left = "103px";
	div.innerHTML = "<a  href=\"http://www.facebook.com/profile.php?id=100001650536878\" target=\"_blank\"><img src=\"http://sindhups.comli.com/Facebook/facebook.png\"/></a>"
	
	body.appendChild(div);
}

// ==============
// ==Credit==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+8px";
	div.style.left = "+125px";
	div.innerHTML = "<a href=\"http://sindprip.blogspot.com\" target=\"blank\"><img src=\"http://sindhups.comli.com/Facebook/blogger.png\" /></a>"
	
	body.appendChild(div);
}