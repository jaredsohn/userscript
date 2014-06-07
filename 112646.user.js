// ==UserScript==
// @name           Facebook Oto Durum Beğen (+vazgeç)
// @namespace      Facebook Durum Beğen (+vazgeç)
// @description    Tek Tıklama ile; Tüm Durumları Beğen (+vazgeç),Tüm Yorumları Aç,Tüm Yorumları Beğen. (Osman APLAK)  [DoctoR.Ossi]
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        1.2
// @require        http://sizzlemctwizzle.com/updater.php?id=112646
// ==/UserScript==

body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+70px";
	div.style.left = "+7px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#0080ff\" TARGET='_blank' href='https://www.facebook.com/DoctoR.Ossi'>Desing By: DoctoR.Ossi</a>"
	
	body.appendChild(div);
		
}



body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+15px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\"><img src=http://img685.imageshack.us/img685/3394/likev.gif height=20 width=20 alt='Tüm Durumları Beğen!' title='Tüm Durumları Beğen!'</img></a>"
	
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

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+45px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoUnLike()\"><image src=http://img577.imageshack.us/img577/1655/unlike.gif height=20 width=20 alt='Tüm Durumları Beğenmekten Vazgeç!' title='Tüm Durumları Beğenmekten Vazgeç!'></a>"
	
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



body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+75px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoExpand()\"><img src=http://img405.imageshack.us/img405/497/expandindex.jpg height=20 width=20 alt='Tüm Yorumları Aç..' title='Tüm Yorumları Aç..'</img></a>"
	
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

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+105px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLikeC()\"><img src=http://img641.imageshack.us/img641/8821/likecommentb.gif height=20 width=20 alt='Tüm Yorumları Beğen!' title='Tüm Yorumları Beğen!'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeC = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
	};
}

