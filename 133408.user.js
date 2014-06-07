// ==UserScript==
// @name           Facebook Auto Like By. DerRy IveNz ☼ DIV32 ☼
// @namespace      facebook_auto_ike
// @description    Like status dan Dinding Facebook hanya dengan Sekali Klik, Flood wall's / Status FaceBook
// @author         http://www.facebook.com/div32
// @homepage       http://www.kakiteng.web.id/
// @include        htt*://touch.facebook.com/*
// @icon           http://i40.tinypic.com/23r37sl.gif
// @version        1.4
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://touch.facebook.com/common/blank.html
// @exclude        htt*://*connect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://touch.facebook.com/plugins/*
// @exclude        htt*://touch.facebook.com/l.php*
// @exclude        htt*://touch.facebook.com/ai.php*
// @exclude        htt*://touch.facebook.com/extern/*
// @exclude        htt*://touch.facebook.com/pagelet/*
// @exclude        htt*://api.touch.facebook.com/static/*
// @exclude        htt*://touch.facebook.com/contact_importer/*
// @exclude        htt*://touch.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://touch.facebook.com/advertising/*
// @exclude	   htt*://touch.facebook.com/ads/*
// @exclude	   htt*://touch.facebook.com/sharer/*
// @exclude	   htt*://touch.facebook.com/send/*
// @exclude	   htt*://touch.facebook.com/mobile/*
// @exclude	   htt*://touch.facebook.com/settings/*

// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+137px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#00ff66";
	div.style.border = "2px solid #4646ff";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ff0090\" href=\"javascript:AutoLike()\"> |- Like All* Status -| </a>"
	
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
	div.style.bottom = "+117px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#23f6ff";
	div.style.border = "2px solid #0166ff";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ff4646\" href=\"JavaScript:AutoUnLike()\"> | Unlike All- Status | </a>"
	
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
	div.style.bottom = "+97px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#ff6644";
	div.style.border = "2px solid #ff4466";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ff4646\" href=\"JavaScript:FloodWal()\"> | = Wall Attack = | </a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Masukkan Jumlah Pesan Yang Akan Dikirim");var msg=prompt("","Masukkan Isi Pesan Anda");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+68px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#10f4ff";
	div.style.border = "2px solid #ff23f4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ff4646\" href=\"https://www.facebook.com/pages/Cikeas-Community-DIV32/178643922160070\">| Web In Facebook |</a>"

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
	div.style.bottom = "+40px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#f646ff";
	div.style.border = "2px solid #ff2323";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#f4f6ff\" href=\"http://www.facebook.com/div32\">|..::+DerRy IveNz+::..</a>"
	
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
	div.style.bottom = "+20px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#4466ff";
	div.style.border = "2px solid #4646ff";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#f46f66\" href=\"http://www.div32.blogspot.com\">|+++ My Web +++|</a>"
	
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
