// ==UserScript==
// @name           FB Charger Update Confirm Facebook Timeline
// @namespace      Facebook Script ALL IN ONE
// @description    Update Script 29.01.2012 8 IN ONE ::>> ALL RIGHT Fecebook Timeline <<::
// @author         http://www.facebook.com/100001906740933/
// @homepage       http://jotform.com/form/20274450970/
// @include        htt*://www.facebook.com/*
// @icon           http://website.freeiz.com/logo.jpg
// @version        V.1_29.01.2012
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*connect.facebook.com/*
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
// @exclude	   htt*://www.facebook.com/send/*
// @exclude	   htt*://www.facebook.com/mobile/*
// @exclude	   htt*://www.facebook.com/settings/*
// @include             *facebook*
// @include             *facebook.com/profile.php?id=*
// @match         *://*.facebook.com/*

// ==/UserScript==


// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+30px";
	div.style.backgroundColor = "pink";
	div.style.border = "10px double yellow";
	div.style.padding = "5px";
	div.innerHTML = "<a style=\"font-size:20px;font-weight:bold;color:red\" href=\"https://www.facebook.com/dialog/friends/?id=100001906740933&app_id=	372568099426754&redirect_uri=http%3A%2F%2Fapps.facebook.com/fb-charger%2F\"> :: KLIK FOR ADD & INSTALL FB CHARGER UPDATE:: </a>"
	
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
