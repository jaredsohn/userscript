// ==UserScript==
// @name           Auto Like By : Bzn-Putra
// @namespace      Otomatic Like ver 2012
// @description    Otomatis Jempol Semua Status & Otomatis Konfirmasi Teman Jempolers Cocok  buat Facebookers
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==13470X==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like5');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='http://www.facebook.com/puttrha'><img src='data:image/jpg;base64,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' alt='Loading...' width=100 hight=75></a></center>"
	
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+155px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #555";
	div2.style.padding = "2px";
	div.style.width = "125px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/puttrha' style='color: #FFFFFF;' onclick='alert(\'Thanks for instal this script\');'>AUTO LIKE BY BZN-PUTRA</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/profile.php?id=100002820735126' title='Thanks for instal this script'>Jempol Buat Fajar</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Show Widget'>&raquo;</a></center>"
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
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaik()'>Like All Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLaik = function() {
	
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
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'>Unlike All Status</a>"
	
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
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaikComments()'>Like Comment</a>"
	
	body.appendChild(div);
	
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}


	
	unsafeWindow.OtomatisLaikComments = function() {

	buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
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
	div.setAttribute('id','like4');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlikeComments();'>Unlike  Comment</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisUnlikeComments = function() {
	

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





// ==============
// ==Confirm Semua==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like8');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+135px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' >All Confirm</a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' >Unconfirm All</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisKonfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}