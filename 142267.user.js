// ==UserScript==
// @name           Facebook Auto Like
// @namespace      Master Yuril Auto Like
// @description    Auto Like
// @icon		http://lockupmwm.webs.com/gambor/FB.png
// @include		http://www.facebook.com/*
// @include		https://www.facebook.com/*
// @exclude		htt*://developers.facebook.com/*
// @version		0.5
// Auto Like, And Another Function.
// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+5px";
	div.style.left = "+5px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/like.png' width='15' height='15' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoLaik()'>Like Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLaik = function() {
	
	 buttons = document.getElementsByTagName("button");
	   for(i = 0; i < buttons.length; i++) {
	    myClass = buttons[i].getAttribute("class");
	     if(myClass != null && myClass.indexOf("like_link") >= 0)
	      if(buttons[i].getAttribute("name") == "like")
		buttons[i].click();
          }
		
     };
}