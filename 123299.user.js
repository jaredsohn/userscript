// ==UserScript==
// @name           Facebook Mini Like Unlike
// @namespace      facebook_mini_like_unLike
// @description    Simple Auto Like and Auto UnLike
// @author		   RieTech @RobertusArie
// @include        htt*://www.facebook.com/*
// @include        htt*s://www.facebook.com/*
// @include        htt*://*static*.facebook.com*
// @include        htt*://*channel*.facebook.com*
// @include        htt*://developers.facebook.com/*
// @include        htt*://upload.facebook.com/*
// @include        htt*://www.facebook.com/common/blank.html
// @include        htt*://*onnect.facebook.com/*
// @include        htt*://*acebook.com/connect*
// @include        htt*://www.facebook.com/plugins/*
// @include        htt*://www.facebook.com/l.php*
// @include        htt*://www.facebook.com/ai.php*
// @include        htt*://www.facebook.com/extern/*
// @include        htt*://www.facebook.com/pagelet/*
// @include        htt*://api.facebook.com/static/*
// @include        htt*://www.facebook.com/contact_importer/*
// @include        htt*://www.facebook.com/ajax/*
// @include        htt*://apps.facebook.com/ajax/*
// @include	       htt*://www.facebook.com/advertising/*
// @include	       htt*://www.facebook.com/ads/*
// @include	       htt*://www.facebook.com/sharer/*
// @include        htt*s://*static*.facebook.com*
// @include        htt*s://*channel*.facebook.com*
// @include        htt*s://developers.facebook.com/*
// @include        htt*s://upload.facebook.com/*
// @include        htt*s://www.facebook.com/common/blank.html
// @include        htt*s://*onnect.facebook.com/*
// @include        htt*s://*acebook.com/connect*
// @include        htt*s://www.facebook.com/plugins/*
// @include        htt*s://www.facebook.com/l.php*
// @include        htt*s://www.facebook.com/ai.php*
// @include        htt*s://www.facebook.com/extern/*
// @include        htt*s://www.facebook.com/pagelet/*
// @include        htt*s://api.facebook.com/static/*
// @include        htt*s://www.facebook.com/contact_importer/*
// @include        htt*s://www.facebook.com/ajax/*
// @include        htt*s://apps.facebook.com/ajax/*
// @include	       htt*s://www.facebook.com/advertising/*
// @include	       htt*s://www.facebook.com/ads/*
// @include	       htt*s://www.facebook.com/sharer/*
// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
        div.style.display = "block";
	div.style.width = "100px";
	div.style.bottom = "+370px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "5px ridge #8c0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://mega-file.com/wp-content/uploads/2012/01/like.jpeg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a style=\"font-weight:bold;color:#2339b2\" href=\"javascript:AutoLike()\" title=\"Like All\">Like Status</a>"
	
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
        div.style.display = "block";
	div.style.width = "100px";
	div.style.bottom = "+330px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "5px ridge #8c0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://mega-file.com/wp-content/uploads/2012/01/unlike.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a style=\"font-weight:bold;color:#2339b2\" href=\"JavaScript:AutoUnLike()\" title=\"UnLike All\">Unlike Status</a>"
	
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


