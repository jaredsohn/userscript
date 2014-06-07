// ==UserScript==
// @name		Auto Like Facebook 1.5 by Asyroful 
// @namespace		auto_like_facebook
// @description		Like status dan Dinding Facebook CUMA KLIK SATU KALI, Flood wall's / Status FaceBook
// @author		http://www.facebook.com/asyroful
// @homepage		http://www.masyroful.blogspot.com/
// @homepage		http://www.sidayucyber.forumid.net/
// @include		htt*://www.facebook.com/*
// @icon		http://i498.photobucket.com/albums/rr346/pakplek/i_folder_new_big.gif
// @version		1.5.0
// @exclude		htt*://*static*.facebook.com*
// @exclude		htt*://*channel*.facebook.com*
// @exclude		htt*://developers.facebook.com/*
// @exclude		htt*://upload.facebook.com/*
// @exclude		htt*://www.facebook.com/common/blank.html
// @exclude		htt*://*connect.facebook.com/*
// @exclude		htt*://*acebook.com/connect*
// @exclude		htt*://www.facebook.com/plugins/*
// @exclude		htt*://www.facebook.com/l.php*
// @exclude		htt*://www.facebook.com/ai.php*
// @exclude		htt*://www.facebook.com/extern/*
// @exclude		htt*://www.facebook.com/pagelet/*
// @exclude		htt*://api.facebook.com/static/*
// @exclude		htt*://www.facebook.com/contact_importer/*
// @exclude		htt*://www.facebook.com/ajax/*
// @exclude 		htt*://apps.facebook.com/ajax/*
// @exclude		htt*://www.facebook.com/advertising/*
// @exclude		htt*://www.facebook.com/ads/*
// @exclude		htt*://www.facebook.com/sharer/*
// @exclude		htt*://www.facebook.com/send/*
// @exclude		htt*://www.facebook.com/mobile/*
// @exclude		htt*://www.facebook.com/settings/*

// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+140px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#FCFCFC";
	div.style.border = "2px solid #060303";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#00CC00\" href=\"javascript:AutoLike()\"> ۞ Like All Status ۞</a>"
	
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
	div.style.bottom = "+120px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#FCFCFC";
	div.style.border = "2px solid #060303";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FF0000\" href=\"JavaScript:AutoUnLike()\"> ۞ Unlike All Status ۞ </a>"
	
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
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+100px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#FCFCFC";
	div.style.border = "2px solid #060303";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#0033CC\" href=\"JavaScript:FloodWal()\"> ۞ → Wall Flood ← ۞ </a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Jumlah Pesan Yang Agan kirim");var msg=prompt("","Isi Pesan Agan Disini");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+55px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FCFCFC";
	div.style.border = "2px solid #060303";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://adf.ly/7yrbn\"> ► Check for Update ◄ </a>"

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
	div.style.bottom = "+35px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#FCFCFC";
	div.style.border = "2px solid #060303";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://twitter.com/albitruji\"> ☻ = By Asyroful = ☻</a>"
	
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
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+15px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#0DB7F9";
	div.style.border = "2px solid #060303";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#83110D\" href=\"http://twitter.com/albitruji\"> ☻ Follow @Albitruji ☻ </a>"
	
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