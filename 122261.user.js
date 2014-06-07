// ==UserScript==
// @name           Auto Like Status Facebook Forum Indonesia Crome
// @namespace      facebook_auto_ike
// @description    Anda hanya perlu sekali klik untuk Suka atau Tidak Suka semua status teman anda yang ada di beranda facebook.
// @author         http://www.forum-indo.com/members/akiuns/
// @homepage       http://www.forum-indo.com/
// @include        htt*://www.facebook.com/*
// @icon           http://forum-indo.com/wp-content/uploads/avatars/5109/81cc4e6a96aead2e8bffd1fb14ef9d91-bpfull.jpg
// @version        1.1
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
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

// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+457px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"javascript:AutoLike()\">Like All Status</a>"
	
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
	div.style.bottom = "+427px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"JavaScript:AutoUnLike()\">Unlike Semua</a>"
	
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
	div.style.bottom = "+397px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://www.forum-indo.com\">Join MyForum </a>"
	
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
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+367px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://userscripts.org/scripts/source/122244.user.js\">Versi Terbaru </a>"

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
	div.style.bottom = "+337px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://www.forum-indo.com/members/akiuns\">Credit Akiuns </a>"
	
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
	div.style.bottom = "+307px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://www.misactivos.com/ads\">Video Dewasa</a>"
	
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
	div.style.bottom = "+277px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://www.download.togelria.com\">Download Mp3 </a>"
	
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
	div.style.bottom = "+247px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://www.forum-indo.com/komunitas\">All Cheat Forum</a>"
	
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
	div.style.bottom = "+217px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://www.togelria.com\">Prediksi Togel</a>"
	
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
	div.style.bottom = "+187px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://www.komunitassosial.com\">Komunitas Sosial</a>"
	
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
	div.style.bottom = "+157px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#228B22\" href=\"http://www.set-byte.com/ads/x/xxx.html\">Sponsor Hot</a>"
	
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