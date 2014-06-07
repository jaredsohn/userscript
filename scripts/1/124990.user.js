// ==UserScript==
// @name           Facebook SimpleAutoApplication
// @namespace      AutoLike
// @description    Facebook SimpleAutoApplication dari Dahlan Ibrahim [a.k.a] aLanSmoKer, dijamin seru buat para sahabat jempolers mania! :D
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==


body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.innerHTML = "<div class=\"bodyOuter\"><div class=\"titleMain\">SimpleAutoAplication</div><div class=\"bodyFixed\"><div class=\"bodyContent\"><div class=\"bodyApp\"><div class=\"titleApp\">Like/UnLike Status</div><div class=\"clear\"></div><div class=\"buttonBody\"><div class=\"buttonLeft\"><a title=\"Like All Status\" href=\"JavaScript:AutoLike()\"><img border=\"0\" src=\"https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/399735_350796754933145_100000084694191_1449064_1233888876_n.jpg\"/></a></div><div class=\"buttonRight\"><a title=\"UnLike All Status\" href=\"JavaScript:AutoUnLike()\"><img border=\"0\" src=\"https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-snc7/397005_350796804933140_100000084694191_1449065_2008130762_n.jpg\"/></a></div></div></div><div class=\"clear\"></div><div class=\"bodyApp\"><div class=\"titleApp\">AddFriend</div><div class=\"clear\"></div><div class=\"buttonBody\"><div class=\"buttonLeft\"><a title=\"Add New Friend\" href=\"JavaScript:AutoFriend()\"><img border=\"0\" src=\"https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/431754_364318960247591_100000084694191_1487227_1694213510_n.jpg\"/></a></div><div class=\"buttonRight\"></div></div></div><div class=\"clear\"></div><div class=\"bodyApp\"><div class=\"titleApp\">Subscribe</div><div class=\"clear\"></div><div class=\"buttonBody\"><div class=\"buttonLeft\"><a title=\"Subscribe All People\" href=\"JavaScript:AutoRss()\"><img border=\"0\" src=\"https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/404278_364301950249292_100000084694191_1487201_1232631652_n.jpg\"/></a></div><div class=\"buttonRight\"></div></div></div></div></div><div class=\"buttonHover\">></div><div class=\"author\"><img src=\"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/161157_100000084694191_502262429_q.jpg\" border=\"0\" width=\"50\" height=\"50\"/><div class=\"textAuthor\"><div>Design by:</div><a href=\"https://www.facebook.com/alandhira\" target=\"_blank\">Dahlan Ibrahim</a></div></div></div>"
	
	body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.innerHTML = "<div class=\"bodyOuter\"><div class=\"titleMain\">SimpleAutoAplication</div><div class=\"bodyFixed\"><div class=\"bodyContent\"><div class=\"bodyApp\"><div class=\"titleApp\">Like/UnLike Status</div><div class=\"clear\"></div><div class=\"buttonBody\"><div class=\"buttonLeft\"><a title=\"Like All Status\" href=\"JavaScript:AutoLike()\"><img border=\"0\" src=\"https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/399735_350796754933145_100000084694191_1449064_1233888876_n.jpg\"/></a></div><div class=\"buttonRight\"><a title=\"UnLike All Status\" href=\"JavaScript:AutoUnLike()\"><img border=\"0\" src=\"https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-snc7/397005_350796804933140_100000084694191_1449065_2008130762_n.jpg\"/></a></div></div></div><div class=\"clear\"></div><div class=\"bodyApp\"><div class=\"titleApp\">AddFriend</div><div class=\"clear\"></div><div class=\"buttonBody\"><div class=\"buttonLeft\"><a title=\"Add New Friend\" href=\"JavaScript:AutoFriend()\"><img border=\"0\" src=\"https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/431754_364318960247591_100000084694191_1487227_1694213510_n.jpg\"/></a></div><div class=\"buttonRight\"></div></div></div><div class=\"clear\"></div><div class=\"bodyApp\"><div class=\"titleApp\">Subscribe</div><div class=\"clear\"></div><div class=\"buttonBody\"><div class=\"buttonLeft\"><a title=\"Subscribe All People\" href=\"JavaScript:AutoRss()\"><img border=\"0\" src=\"https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/404278_364301950249292_100000084694191_1487201_1232631652_n.jpg\"/></a></div><div class=\"buttonRight\"></div></div></div></div></div><div class=\"buttonHover\">></div><div class=\"author\"><img src=\"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/161157_100000084694191_502262429_q.jpg\" border=\"0\" width=\"50\" height=\"50\"/><div class=\"textAuthor\"><div>Design by:</div><a href=\"https://www.facebook.com/alandhira\" target=\"_blank\">Dahlan Ibrahim</a></div></div></div>"
	
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
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
    	unsafeWindow.AutoFriend = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("value");
			if(myClass != null && myClass.indexOf("Tambah Sebagai Teman") >= 0)
				if(buttons[i].getAttribute("type") == "button")
					buttons[i].click();
		}
		
	};
        unsafeWindow.AutoRss = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("value");
			if(myClass != null && myClass.indexOf("Berlangganan") >= 0)
				if(buttons[i].getAttribute("type") == "submit")
					buttons[i].click();
		}
		
	};
}
// ==============