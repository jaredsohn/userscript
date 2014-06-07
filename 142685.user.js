// ==UserScript==
// @name           Auto Like Auto Comment and Auto Confirm  Facebook 2014
// @namespace      Auto Like & Confirm
// @description    By 3rd-ant.bLogspot.com
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Picture==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+145px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='http://facebook.com/3rdant'><img src='https://lh3.googleusercontent.com/-iGcZ3LGld1w/UEE-U_U-3yI/AAAAAAAAAYw/x-hCKFTPEEQ/s361/3rdant+Auto+Bomb+Like.jpg' alt='3rd-ant.bLogspot.com' width='125' height='75' </a></center>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+122px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #555";
	div2.style.padding = "2px";
	div.style.width = "125px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://facebook.com/3rdant' style='color: #FFFFFF;' onclick='alert(\'Thanks for installing this script\');'>Auto Like By 3rd-ant.bLogspot.com</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://facebook.com/3rdant' title='Thanks for installing this script'>Auto Like By 3rd-ant.bLogspot.com</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Show Widget'>&raquo;</a></center>"
		}
	}
	};
}

// ==============
// ==Like All Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://photos-a.ak.fbcdn.net/photos-ak-snc7/v85006/237/193048140809145/app_2_193048140809145_1500214905.gif' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='LangsungResep()'>Like All Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.LangsungResep = function() {
	
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
// ==Unlike All Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh5.googleusercontent.com/-a5ZWWHo9hko/UEE_yHLsGbI/AAAAAAAAAZM/djzHqa-a8Oo/s104/fb-unlike-symbol_3rdant.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='LangsungUnlike()'>Unlike All Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.LangsungUnlike = function() {
	
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
	div.setAttribute('id','like4');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh6.googleusercontent.com/-waHRULlkgU0/Tyhu973-VaI/AAAAAAAAAM8/Zk8SPSCm6C4/s128/fake-buku.blogspot%20---logo%20%283%29.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoExpand()'>Expand Comments</a>"
	
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
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like5');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://photos-a.ak.fbcdn.net/photos-ak-snc7/v85006/237/193048140809145/app_2_193048140809145_1500214905.gif' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='LangsungResepComments()'>Like Comment</a>"
	
	body.appendChild(div);
	
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}


	
	unsafeWindow.LangsungResepComments = function() {

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
	div.setAttribute('id','like6');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh5.googleusercontent.com/-a5ZWWHo9hko/UEE_yHLsGbI/AAAAAAAAAZM/djzHqa-a8Oo/s104/fb-unlike-symbol_3rdant.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='LangsungUnlikeComments();'>Unlike  Comment</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.LangsungUnlikeComments = function() {
	

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
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='LangsungAtuh();' >All Confirm</a>&nbsp; &#8226;&nbsp;<a onclick='LangsungAbaikan();' >Unconfirm All</a>"
	
	body.appendChild(div);
	//ini untuk Fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.LangsungAtuh = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.LangsungAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}