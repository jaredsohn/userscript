// ==UserScript==
// @name Facebook AutoLike Credit By Mirza ChiBi
// @namespace AutoLike Facebook
// @description Automaticly like facebook statuses and comments
// @author         http://www.facebook.com/profile.php?id=100003517932602
// @include http://www.facebook.com/*
// @version        1.0
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
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+573px";
div.style.left = "+700px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/profile.php?id=100003517932602\"> </a>"

body.appendChild(div);
}
//==============
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+240px";
	div.style.left = "+25px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:FloodWal()\"> |  =  Bom Wall/Status Teman   =  | </a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Masukkan Jumlah Pesan Yang Akan Dikirim");var msg=prompt("","Masukkan Isi Pesan Anda");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}
//==========
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+212px";
	div.style.left = "+25px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\">Lihat Komentar Lain</a>"
	
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
// ==Statuses==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+180px";
div.style.left = "+25px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like all statuses___!</a>"

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
div.style.bottom = "+160px";
div.style.left = "+25px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">Unlike All statuses_!</a>"

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
// ==Like Coment==

body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+130px";
div.style.left = "+25px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:LikeCom()\">Like all coment____!</a>"

body.appendChild(div);

unsafeWindow.LikeCom = function() {

buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("stat_elem") >= 0)
if(buttons[i].getAttribute("title") == "Suka komentar ini")
buttons[i].click();



}

};
}
// ==============
// ==Unlike Coment==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+110px";
div.style.left = "+25px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:UnlikeCom()\">Unlike all coment__!</a>"

body.appendChild(div);

unsafeWindow.UnlikeCom = function() {

buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("stat_elem") >= 0)
if(buttons[i].getAttribute("title") == "Tidak suka komentar ini")
buttons[i].click();
}

};
}
// ==============
// ==Kiriman==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+80px";
div.style.left = "+25px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:BerhentiDariKiriman()\">Berhenti Mengikuti Kiriman</a>"

body.appendChild(div);

unsafeWindow.BerhentiDariKiriman = function() {

buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("unsub_link") >= 0)
if(buttons[i].getAttribute("name") == "unsubscribe")
buttons[i].click();

}

};
}
// ==============
// ==Kiriman==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+60px";
div.style.left = "+25px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:Ikut()\">Ikuti Kiriman___________!</a>"

body.appendChild(div);

unsafeWindow.Ikut = function() {

buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("unsub_link") >= 0)
if(buttons[i].getAttribute("name") == "subscribe")
buttons[i].click();
}

};
}
// ==============
// ==Konfirm==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+30px";
div.style.left = "+25px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:Konfirm()\">Terima Semua Pertemanan</a>"

body.appendChild(div);

unsafeWindow.Konfirm = function() {

buttons = document.getElementsByName("actions[accept]");
for(i = 0; i < buttons.length; i++) {
document.getElementsByName("actions[accept]")
[i].click();
}void(0);

};
}
// ==Konfirm==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+10px";
div.style.left = "+25px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:Tolak()\">Tolak Semua Pertemanan_!</a>"

body.appendChild(div);

unsafeWindow.Tolak = function() {

buttons = document.getElementsByName("actions[hide]");
for(i = 0; i < buttons.length; i++) {
document.getElementsByName("actions[hide]")
[i].click();
}void(0);

};
}