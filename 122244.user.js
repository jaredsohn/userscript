// ==UserScript==
// @name           Auto Like Status Facebook Forum Indonesia
// @namespace      facebook_auto_ike
// @description    Anda hanya perlu sekali klik untuk Suka atau Tidak Suka semua status teman anda yang ada di beranda facebook.
// @author         http://www.forum-indo.com/members/akiuns/
// @homepage       http://www.forum-indo.com/
// @include        htt*://www.facebook.com/*
// @include        htt*s://www.facebook.com/*
// @include        htt*://*static*.facebook.com*
// @include        htt*://*channel*.facebook.com*
// @include        htt*://developers.facebook.com/*
// @include        htt*://upload.facebook.com/*
// @include        htt*://www.facebook.com/common/blank.html
// @include        htt*://*onnect.facebook.com/*
// @include        htt*://*acebook.com/connect*
// @include        htt*://www.facebook.com/plugins/*
// @include        htt*://www.facebook.com/l.php*
// @include        htt*://www.facebook.com/ai.php*
// @include        htt*://www.facebook.com/extern/*
// @include        htt*://www.facebook.com/pagelet/*
// @include        htt*://api.facebook.com/static/*
// @include        htt*://www.facebook.com/contact_importer/*
// @include        htt*://www.facebook.com/ajax/*
// @include        htt*://apps.facebook.com/ajax/*
// @include	   htt*://www.facebook.com/advertising/*
// @include	   htt*://www.facebook.com/ads/*
// @include	   htt*://www.facebook.com/sharer/*
// @include        htt*s://*static*.facebook.com*
// @include        htt*s://*channel*.facebook.com*
// @include        htt*s://developers.facebook.com/*
// @include        htt*s://upload.facebook.com/*
// @include        htt*s://www.facebook.com/common/blank.html
// @include        htt*s://*onnect.facebook.com/*
// @include        htt*s://*acebook.com/connect*
// @include        htt*s://www.facebook.com/plugins/*
// @include        htt*s://www.facebook.com/l.php*
// @include        htt*s://www.facebook.com/ai.php*
// @include        htt*s://www.facebook.com/extern/*
// @include        htt*s://www.facebook.com/pagelet/*
// @include        htt*s://api.facebook.com/static/*
// @include        htt*s://www.facebook.com/contact_importer/*
// @include        htt*s://www.facebook.com/ajax/*
// @include        htt*s://apps.facebook.com/ajax/*
// @include	   htt*s://www.facebook.com/advertising/*
// @include	   htt*s://www.facebook.com/ads/*
// @include	   htt*s://www.facebook.com/sharer/*
// @icon           http://forum-indo.com/wp-content/uploads/avatars/5109/81cc4e6a96aead2e8bffd1fb14ef9d91-bpfull.jpg
// @version        1.3
// ==/UserScript==

// ==============
// ==Picture==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "100px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+67px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='http://www.forum-indonesia.com/'><img src='http://forum-indonesia.com/wp-content/themes/facebookwb/css/logo.png' alt='Forum-Indonesia' width='100' height='75' title='Forum Indonesia Bebas Berorasi dan berdiskusi'> </a></center>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+37px";
	div2.style.left = "+2px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #555";
	div2.style.padding = "2px";
	div2.style.width = "100px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Sembunyikan Widget Ini'>&laquo;</a> &#8226; <a href='http://www.forum-indo.com/' style='color: #FFFFFF;' onclick='alert(\'Terimakasih Telah menggunakan widget Auto Like FB FI V 1.3\');'>ALFB FI V 1.3</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Sembunyikan Widget Ini'>&laquo;</a> &#8226; <a href='http://www.forum-indonesia.com/' title='Terimakasih Telah Menggunakan Widget Auto Like FB FI V 1.3'>ALFB FI V 1.3</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Tampilkan Widget Ini'>&raquo;</a></center>"
		}
	}
	};
}
// ==============

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
        div.style.display = "block";
	div.style.width = "100px";
	div.style.bottom = "+392px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://mega-file.com/wp-content/uploads/2012/01/like.jpeg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a style=\"font-weight:bold;color:#228B22\" href=\"javascript:AutoLike()\" title=\"Klik Disini Jika Ingin Like Semua Status Update Facebook\">Like Status</a>"
	
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
        div.style.display = "block";
	div.style.width = "100px";
	div.style.bottom = "+337px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://mega-file.com/wp-content/uploads/2012/01/unlike.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a style=\"font-weight:bold;color:#228B22\" href=\"JavaScript:AutoUnLike()\" title=\"Klik Disini Jika Ingin Membatalkan Semua Like Status Update Facebook\">Unlike Status</a>"
	
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
	div3 = document.createElement("div");
	div3.setAttribute('id','spoiler');
	div3.style.position = "fixed";
	div3.style.opacity= 0.90;
	div3.style.bottom = "+312px";
	div3.style.left = "+2px";
	div3.style.backgroundColor = "#CCD3E3";
	div3.style.border = "1px dashed #555";
	div3.style.padding = "2px";
	div3.style.width = "100px";
	div3.innerHTML = "<div style='background-color: #2E5392;font-weight:bold; color: #FFFFFF; border: 1px dashed #333333;'>&#8226; <a href='http://forum-indo.com/ads/auto-like.html' style='color: #FFFFFF;' onclick='alert(\'Klik Disini Untuk Mendapatkan Auto Like FB FI yang terbaru\');'>Refress</a></div> "
	
	
	body.appendChild(div3);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div3.innerHTML = "&#8226; <a href='http://forum-indo.com/ads/auto-like.html' title='Klik Disini Untuk Mendapatkan Auto Like FB FI yang terbaru'>Refress</a>"
		}
		else {
			x.style.display="none";
			div3.innerHTML = "<a onclick='spoiler()' title='Tampilkan Widget Ini'>&raquo;</a>"
		}
	}
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div4 = document.createElement("div");
	div4.setAttribute('id','spoiler');
	div4.style.position = "fixed";
	div4.style.opacity= 0.90;
	div4.style.bottom = "+287px";
	div4.style.left = "+2px";
	div4.style.backgroundColor = "#CCD3E3";
	div4.style.border = "1px dashed #555";
	div4.style.padding = "2px";
	div4.style.width = "100px";
	div4.innerHTML = "<div style='background-color: #2E5392; font-weight:bold;color: #FFFFFF; border: 1px dashed #333333;'>&#8226; <a href='http://www.misactivos.com/ads/' style='color: #FFFFFF;' onclick='alert(\'Untuk Usia 21 Tahun Keatas, Jangan Diklik\');'>Dewasa 20+</a></div> "
	
	
	body.appendChild(div4);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div4.innerHTML = "&#8226; <a href='http://www.misactivos.com/ads/' title='Untuk Usia 21 Tahun Keatas, Jangan Diklik'>Dewasa 20+</a>"
		}
		else {
			x.style.display="none";
			div4.innerHTML = "<a onclick='spoiler()' title='Tampilkan Widget Ini'>&raquo;</a>"
		}
	}
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div5 = document.createElement("div");
	div5.setAttribute('id','spoiler');
	div5.style.position = "fixed";
	div5.style.opacity= 0.90;
	div5.style.bottom = "+262px";
	div5.style.left = "+2px";
	div5.style.backgroundColor = "#CCD3E3";
	div5.style.border = "1px dashed #555";
	div5.style.padding = "2px";
	div5.style.width = "100px";
	div5.innerHTML = "<div style='background-color: #2E5392;font-weight:bold; color: #FFFFFF; border: 1px dashed #333333;'>&#8226; <a href='http://www.misactivos.com/ads/' style='color: #FFFFFF;' onclick='alert(\'Yang Suka Musik Dapatkan Dengan Gratis\');'>Musik MP3</a>"
	
	
	body.appendChild(div5);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div5.innerHTML = "&#8226; <a href='http://www.misactivos.com/ads/' title='Yang Suka Musik Dapatkan Dengan Gratis'>Musik MP3</a>"
		}
		else {
			x.style.display="none";
			div5.innerHTML = "<a onclick='spoiler()' title='Tampilkan Widget Ini'>&raquo;</a>"
		}
	}
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div6 = document.createElement("div");
	div6.setAttribute('id','spoiler');
	div6.style.position = "fixed";
	div6.style.opacity= 0.90;
	div6.style.bottom = "+237px";
	div6.style.left = "+2px";
	div6.style.backgroundColor = "#CCD3E3";
	div6.style.border = "1px dashed #555";
	div6.style.padding = "2px";
	div6.style.width = "100px";
	div6.innerHTML = "<div style='background-color: #2E5392;font-weight:bold; color: #FFFFFF; border: 1px dashed #333333;'>&#8226; <a href='http://www.forum-indo.com/komunitas' style='color: #FFFFFF;' onclick='alert(\'Yang Suka Cheat Games Online Silahkan Masuk, Mari Berdiskusi Bersama\');'>Diskusi Game</a></div> "
	
	
	body.appendChild(div6);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div6.innerHTML = "&#8226; <a href='http://www.forum-indo.com/komunitas/' title='Yang Suka Cheat Games Online Silahkan Masuk, Mari Berdiskusi Bersama'>Diskusi Game</a> "
		}
		else {
			x.style.display="none";
			div6.innerHTML = "<a onclick='spoiler()' title='Tampilkan Widget Ini'>&raquo;</a>"
		}
	}
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div7 = document.createElement("div");
	div7.setAttribute('id','spoiler');
	div7.style.position = "fixed";
	div7.style.opacity= 0.90;
	div7.style.bottom = "+212px";
	div7.style.left = "+2px";
	div7.style.backgroundColor = "#CCD3E3";
	div7.style.border = "1px dashed #555";
	div7.style.padding = "2px";
	div7.style.width = "100px";
	div7.innerHTML = "<div style='background-color: #2E5392;font-weight:bold; color: #FFFFFF; border: 1px dashed #333333;'>&#8226; <a href='http://www.togelria.com/' style='color: #FFFFFF;' onclick='alert(\'Yang Suka Togel Silahkan Masuk, Dapatkan Prediksi Ramalan Togel Dengan Gratis\');'>Info Togel</a> "
	
	
	body.appendChild(div7);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div7.innerHTML = "&#8226; <a href='http://www.togelria.com/' title='Yang Suka Togel Silahkan Masuk, Dapatkan Prediksi Ramalan Togel Dengan Gratis'>Info Togel</a>"
		}
		else {
			x.style.display="none";
			div7.innerHTML = "<a onclick='spoiler()' title='Tampilkan Widget Ini'>&raquo;</a>"
		}
	}
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div8 = document.createElement("div");
	div8.setAttribute('id','spoiler');
	div8.style.position = "fixed";
	div8.style.opacity= 0.90;
	div8.style.bottom = "+187px";
	div8.style.left = "+2px";
	div8.style.backgroundColor = "#CCD3E3";
	div8.style.border = "1px dashed #555";
	div8.style.padding = "2px";
	div8.style.width = "100px";
	div8.innerHTML = "<div style='background-color: #2E5392;font-weight:bold; color: #FFFFFF; border: 1px dashed #333333;'>&#8226; <a href='http://www.komunitassosial.com/' style='color: #FFFFFF;' onclick='alert(\'Forum Bebas membahas Segala Masalah\');'>Kom.Sosial</a></div> "
	
	
	body.appendChild(div8);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div8.innerHTML = "<a onclick='spoiler()' title='Sembunyikan Widget Ini'>&laquo;</a> &#8226; <a href='http://www.komunitassosial.com/' title='Forum Bebas membahas Segala Masalah'>Kom.Sosial</a>"
		}
		else {
			x.style.display="none";
			div8.innerHTML = "<a onclick='spoiler()' title='Tampilkan Widget Ini'>&raquo;</a>"
		}
	}
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div9 = document.createElement("div");
	div9.setAttribute('id','spoiler');
	div9.style.position = "fixed";
	div9.style.opacity= 0.90;
	div9.style.bottom = "+162px";
	div9.style.left = "+2px";
	div9.style.backgroundColor = "#CCD3E3";
	div9.style.border = "1px dashed #555";
	div9.style.padding = "2px";
	div9.style.width = "100px";
	div9.innerHTML = "<div style='background-color: #2E5392; font-weight:bold;color: #FFFFFF; border: 1px dashed #333333;'>&#8226; <a href='http://www.set-byte.com/ads/x/xxx.html' style='color: #FFFFFF;' onclick='alert(\'Halaman Sponsor Di klik makasih gak juga gak papa\');'>Sponsor FI</a></div> "
	
	
	body.appendChild(div9);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div9.innerHTML = "&#8226; <a href='http://www.set-byte.com/ads/x/xxx.html' title='Halaman Sponsor Di klik makasih gak juga gak papa.'>Sponsor FI</a>"
		}
		else {
			x.style.display="none";
			div9.innerHTML = "<a onclick='spoiler()' title='Tampilkan Widget Ini'>&raquo;</a>"
		}
	}
	};
}
// ==============