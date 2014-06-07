// ==UserScript==
// @name           Komentar status BBi (Barang Bekas Indonesia) ++ By BBi Central®
// @namespace      http://bbicentral.blogspot.com
// @description    Perfect Facebook Command By:GothicResistor®
// @Feature        Auto Like/Unlike,Wall Attack!,Facebook=Font Comics Sans 
// @author         http://www.facebook.com/
// @homepage       http://bbicentral.blogspot.com
// @include        htt*://www.facebook.com/*
// @version        9.4.9
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*facebook.com/connect*
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
// @copyright      2012,BBiCentral®
// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+120px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#transparent";
	div.style.border = "1px solid #0101DF";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#0101DF\" href=\"javascript:AutoLike()\"> |= Like All Status =| </a>"
	
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
	div.style.bottom = "+100px";
	div.style.left = "+7px";
	div.style.backgroundColor = "#transparent";
	div.style.border = "1px solid #DF0101";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#DF0101\" href=\"JavaScript:AutoUnLike()\"> |= Unlike All Status =| </a>"
	
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
// ==twitter==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+80px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#transparent";
	div.style.border = "1px solid #00FFFF";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#00FFFF\" href=\"http://twitter.com/GroupBBi\"> |= follow me @GroupBBi =| </a>"
	
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
// ==facebook==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+60px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#transparent";
	div.style.border = "1px solid #0101DF";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#0101DF\" href=\"http://facebook.com/kenziejavasniscala.central\"> |= my facebook =| </a>"
	
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
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#transparent";
	div.style.border = "1px solid #DF0101";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#DF0101\" href=\"JavaScript:FloodWal()\"> |= Wall Attack!! =| </a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Masukin Jumlah Pesan Yang Mau Lo Dikirim!");var msg=prompt("","Masukin Isi Pesan Lo Disini!!");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#transparent";
	div.style.border = "1px solid #3B0B0B";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#3B0B0B\" href=\"http://bbicentral.blogspot.com\">|= my websites =|</a>"
	
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

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('div, span, h1,h2,h3,h4,h5,h6{font-family:"Comic Sans MS" !important;}');