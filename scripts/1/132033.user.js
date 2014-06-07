// ==UserScript==
// @name		FvckThisShit4FaceBook
// @namespace		facebook_auto_ike
// @description		FvckThisShit4FaceBook karena facebook adalah tempat sampah :D
// @author		http://www.facebook.com/idlohulhaq
// @homepage		http://www.idlohulhaq.com/
// @include		htt*://www.facebook.com/*
// @icon		http://s3.amazonaws.com/uso_ss/icon/132033/large.png
// @version		v.zero
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
// @exclude		htt*://apps.facebook.com/ajax/*
// @exclude		htt*://www.facebook.com/advertising/*
// @exclude		htt*://www.facebook.com/ads/*
// @exclude		htt*://www.facebook.com/sharer/*
// @exclude		htt*://www.facebook.com/send/*
// @exclude		htt*://www.facebook.com/mobile/*
// @exclude		htt*://www.facebook.com/settings/*

// ==/UserScript==

// ==============
// ==Kasih Jempol==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.opacity= 0.75;
	div.style.position = "fixed";
	div.style.bottom = "+175px";
	div.style.left = "+15px";
	div.style.backgroundColor = "#0000ff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "3px";
	div.style.zIndex= "500";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"javascript:AutoLike()\" title=\"Suuukkkaaaah....\">[ Jempoli Semua Setatus ]</a>"
	
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
// ==Tarik Jempol==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.opacity= 0.75;
	div.style.position = "fixed";
	div.style.bottom = "+145px";
	div.style.left = "+15px";
	div.style.backgroundColor = "#0000ff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "3px";
	div.style.zIndex= "500";
	div.innerHTML = "<a style=\"font-weight:bold;color:#fff\" href=\"JavaScript:AutoUnLike()\" title=\"Batal suuukkkaaahhh.. gak jadi..\"> [ Balikin Jempolku ] </a>"
	
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
// ==Gojrot Dinding==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.opacity= 0.75;
	div.style.position = "fixed";
	div.style.bottom = "+115px";
	div.style.left = "+15px";
	div.style.backgroundColor = "#0000ff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "3px";
	div.style.zIndex= "500";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"JavaScript:FloodWal()\" title=\"Wall attack alias serangan fajar ma meen..\"> [ Gojrot Dinding ] </a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Masukkan Jumlah Pesan Yang Akan Dikirim");var msg=prompt("","Masukkan Isi Pesan Anda");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}
// ==Homepage==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.opacity= 0.75;
	div.style.position = "fixed";
	div.style.bottom = "+85px";
	div.style.left = "+15px";
	div.style.backgroundColor = "#0000ff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "3px";
	div.style.zIndex= "500";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"http://www.idlohulhaq.com\" title=\"KompuTechno Tutorials &amp; News\">FanPage [ idlohulhaqDOTcom ]</a>"

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
// ==Phate Holloway==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.opacity= 0.75;
	div.style.position = "fixed";
	div.style.bottom = "+55px";
	div.style.left = "+15px";
	div.style.backgroundColor = "#0000ff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "3px";
	div.style.zIndex= "500";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"http://www.facebook.com/phateholloway\" title=\"FvckThisShit4Facebook Author's\"> [ Phate Holloway ] </a>"
	
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
// ==RSS==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.opacity= 0.75;
	div.style.position = "fixed";
	div.style.bottom = "+25px";
	div.style.left = "+15px";
	div.style.backgroundColor = "#0000ff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "3px";
	div.style.zIndex= "500";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"http://www.idlohulhaq.com/feeds/posts/default\" title=\"Subscribe 2 idlohulhaqDOTcom\"> [ idlohulhaqDOTcom RSS ] </a>"
	
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
// ==Cek Update FvckThisShit==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.opacity= 0.75;
	div.style.position = "fixed";
	div.style.bottom = "+25px";
	div.style.left = "+180px";
	div.style.backgroundColor = "#0000ff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "3px";
	div.style.zIndex= "500";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"http://userscripts.org/scripts/show/132033\" title=\"Cek Update FvckThisShit\"> [ Update ] </a>"
	
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