// ==UserScript==
// @name           Facebook AutoLike Dn14
// @namespace      AutoLike Dn14
// @description    Like Facebook Status
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
        div.style.width = "125px"; 
	div.style.opacity = 0.90;
	div.style.bottom = "+75px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#00BFFF";
	div.style.border = "2px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\">Like‼</a>"
	
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
// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
        div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+50px";
	div.style.leftt = "+6px";
	div.style.backgroundColor = "#00BFFF";
	div.style.border = "2px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://www4.picturepush.com/photo/a/2772887/480/png/Plus.png?v0' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a style=\"font-weight:bold;color:#FFFFFF\" href=\"http://www.facebook.com/Wildan140195()\">Ahmad Wildan</a>"
	
	body.appendChild(div);
		
	unsafeWindow.wildan = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div.innerHTML = "<a onclick='wildan()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/Wildan140195' title='Dn14 Corp'>Created By Dn14. Z</a>"
		}
	};
}

// ==============