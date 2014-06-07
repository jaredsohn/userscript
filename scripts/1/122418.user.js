// ==UserScript==
// @name           Facebook Auto Like And Spammer By exTwo.*x2 with wall attack
// @namespace      By exTwo.*x2
// @description    Serang Facebook teman anda dengan auto like 
// @author         http://www.facebook.com/grass.extwo
// @homepage       http://www.facebook.com/grass.extwo
// @include        htt*://www.facebook.com/*
// @icon           http://t3.gstatic.com/images?q=tbn:ANd9GcRBNfzcsAws_7z-rzqYwUueAhaoJE7wHHI9OsbdpHsU9j0-2B2pTA
// @version        4.0
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
	div.style.bottom = "+157px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4169E1\" href=\"javascript:AutoLike()\"> ->Like All Status<- </a>"
	
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
	div.style.bottom = "+137px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4169E1\" href=\"JavaScript:AutoUnLike()\"> ->Unlike All Status<- </a>"
	
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
// ==============
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+117px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4169E1\" href=\"JavaScript:FloodWal()\"> ->Wall Attack Friend<- </a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Berapa Pesan Yang Akan Kamu Masukan");var msg=prompt("","Tuliskan Pesan Anda");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+97px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4169E1\" href=\"http://facebook.com\">->Refresh [F5]<-</a>"
	
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
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+77px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4169E1\" href=\"JavaScript:AutoLikeComments()\">->Like all comments <-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();			
															
		}
		
	};
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+57px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4169E1\" href=\"JavaScript:AutoUnLikeComments()\"> ->Unlike all comments<-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Unlike this comment")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+37px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4169E1\" href=\"http://www.zone-h.org/archive/notifier=exTwo.%252Ax2\">->Zone-h<-</a>"

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
// ==Expand CReaTor==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+17px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#9ACD32";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/grass.extwo\">->Creator By exTwo.*x2<-</a>"
	
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