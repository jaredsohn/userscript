// ==UserScript==
// @name           Erfan UM Simple
// @namespace      Automatic.Like
// @description    Auto Super Jempol : Simple/sederhana !!
// @include        http*://www.facebook.com/*
// @include        http*://www.facebook.tld/*
// ==/UserScript==

// == Automatic.Like ==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "155px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+205px";
	div.style.left = "+4px";
	div.style.backgroundColor = "#";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "0px";
	div.innerHTML = "<body><a href='http://www.zudjian22.blogspot.com'>Zudjian22 </a><body/></center>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+185px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#";
	div2.style.border = "0px dashed #555";
	div2.style.padding = "0px";
	div.style.width = "125px";
	div2.innerHTML = "<div style='background-color: #; color: #FF0000; border: 0px dashed #333333;'><center><a style='font-weight: bold; color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Widget'></a><a href='http://www.facebook.com/Erfan92' style='font-weight: bold; font-size: 11px; color: #000000;' onclick='alert(\'Thanks for instal this script\');'>Erfan Uzhu makhiy‚</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Hidden Widget'></a><a href='http://www.facebook.com/Erfan92' title='Thanks for instal this script'>profile Î³ÏŒÏ…Î´Î¹Î­ ÎÎ±ÏÎºÏ‰Î¼Î­Î½Î¿Ï‚</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Show Widget'>&raquo;</a></center>"
		}
	}
	};
}
// ==============
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+152px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#";
	div.style.border = "0px solid #94a3c4";
	div.style.padding = "0px";
	div.innerHTML = "<img src='http://i1128.photobucket.com/albums/m481/youdielastlife/Facebook/icon-d1.png' width='16' height='14' align='absmiddle'> <a style=\"font-weight:bold;color:#3860BB\" href=\"JavaScript:AutoExpand()\">EXPAND COMMENTS</a>"
	
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
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#";
	div.style.border = "0px solid #94a3c4";
	div.style.padding = "0px";
	div.innerHTML = "<img src='http://i1128.photobucket.com/albums/m481/youdielastlife/Facebook/icon-d3.png' width='16' height='14' align='absmiddle'> <a style=\"font-weight:bold;color:#3860BB\" href=\"JavaScript:AutoLike()\">LIKE ALL STATUS</a>"
	
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
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#";
	div.style.border = "0px solid #94a3c4";
	div.style.padding = "0px";
	div.innerHTML = "<img src='http://i1128.photobucket.com/albums/m481/youdielastlife/Facebook/icon-d2.png' width='16' height='14' align='absmiddle'> <a style=\"font-weight:bold;color:#3860BB\" href=\"JavaScript:AutoUnLike()\">UNLIKE ALL STATUS</a>"
	
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
// ==Confirm Semua==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+20px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "0px";
	div.innerHTML = "â€¢ <a onclick='OtomatisKonfirm();' >CONFIRM ALL</a></a> â€¢ <a onclick='OtomatisAbaikan();' >HIDDEN ALL</a></a> â€¢"
	
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
