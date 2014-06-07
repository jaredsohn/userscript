// ==UserScript==
// @name           Facebook Double Status & Auto Like By. MAYOGIS
// @namespace      Facebook Double Status & Auto Like
// @description    Update STATUS berulang ulang dan LIKE semua status Orang Hanya 1 X Klik.
// @author         http://www.facebook.com/by.mayogis
// @homepage       https://www.jotform.com/form/20235931011/
// @include        htt*://www.facebook.com/*
// @icon           http://website.freeiz.com/logo.jpg
// @version        1.27.01.2012
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

// ==/UserScript==
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+210px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "3px double #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000066\" href=\"http://userscripts.org/scripts/show/124278\">NEW UPDATE FB 7 IN 1</a>"
	
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
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+180px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#33FF33";
	div.style.border = "3px double #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4706FF\" href=\"javascript:AutoLike()\"> JEMPOL SEMUA STATUS </a>"
	
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
	div.style.bottom = "+150px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#99FF07";
	div.style.border = "3px double #33FFFF";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FF0000\" href=\"JavaScript:AutoUnLike()\">UNLIKE STATUS</a>"
	
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
	div.style.bottom = "+120px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#EBFF06";
	div.style.border = "3px double #660000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#6600CC\" href=\"JavaScript:FloodWal()\">DOUBLE STATUS</a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Masukkan berapa kali status anda akan terupdate");var msg=prompt("","Masukkan Status Anda");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+90px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#FFCC00";
	div.style.border = "3px double #000099";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" https://www.facebook.com/mayogis.collection\">GABUNG DI SINI</a>"

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
	div.style.bottom = "+60px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#FF99FF";
	div.style.border = "3px double #FF6600";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#CC33CC\" href=\"http://www.facebook.com/MAYOGIS.TV.ONLINE\">TV ONLINE</a>"
	
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
// ===Expand===
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "3px double #000000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\">BUKA SEMUA KOMENTAR"
	
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
// ==============