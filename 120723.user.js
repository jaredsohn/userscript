// ==UserScript==
// @name           Auto Like On Post V.2.1 By Zhon
// @namespace      AutoLike
// @description    Automaticly like facebook on status
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==


// == http://zhonreturn.blogspot.com ==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.bottom = "+100px";
	div.style.left = "+6px";
	div.style.width = "200px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='http://zhonreturn.blogspot.com/' target='_blank' title='zhonreturn.blogspot.com'><img src='https://lh5.googleusercontent.com/-qzM2PuS9Bmk/Tu0rYytAfSI/AAAAAAAAAXc/BeWedRUYFto/s800/Zhon%252520Return.jpg' alt='Loading...' width=100% hight=100%></a></center>"
	
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div.style.display = "block";
	div2.style.bottom = "+80px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #555";
	div2.style.padding = "2px";
	div.style.width = "130px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> Created :<a href='https://www.facebook.com/pages/Zhon-Return/230068497037870' style='color: #FFFFFF;' title='Zhon Profil' target='_blank'> Zhon Return »</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a><a title='Zhon Profil'> Created : Zhon Return »</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menampilkan Widget'>&raquo;</a></center>"
		}
	}
	};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px"; 
	div.style.bottom = "+60px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://1.bp.blogspot.com/_VRwISTiabbk/TUzkj5pmZeI/AAAAAAAABCk/D4PR6KFfvss/s1600/like.jpeg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'><b>Like all statuz</b></a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
	
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
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px"; 
	div.style.bottom = "+40px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://1.bp.blogspot.com/_VRwISTiabbk/TUzkj5pmZeI/AAAAAAAABCk/D4PR6KFfvss/s1600/like.jpeg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'><b>Unlike all statuz</b></a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisUnlike = function() {
	
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
// ==Update==
body = document.body;
if(body != null) {
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div.style.display = "block";
	div2.style.bottom = "+19px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #555";
	div2.style.padding = "2px";
	div.style.width = "130px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> Update - Your  <a href='https://apps.facebook.com/darihacker-keder/' style='color: #FFFFFF;' title='Update via Hacker Keder' target='_blank'> - Statuz »</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a><a title='Update script terbaru'> Update via Hacker Keder »</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menampilkan Widget'>&raquo;</a></center>"
		}
	}
	};
}
// End==