// ==UserScript==
// @name           Facebook Auto Like, Auto Confirm, Auto Add Friends 
// @namespace      Facebook Auto Like, Auto Confirm, Auto Add Friends  ver.2.0
// @description    Automatically Like/Unlike All Status or Comment and Confirm/Unconfirm All Request Auto Add Friends 
// @author			13470X (http://www.facebook.com/128290387216157)
// @icon			http://profile.ak.fbcdn.net/hprofile-ak-snc4/211212_123119524438901_2557853_n.jpg
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			htt*://developers.facebook.com/*
//
// Copyright (c) 2012, 13470X
// Auto Like/Unlike, And Another Function.
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
	div.innerHTML = "<center><a href='http://www.facebook.com/128290387216157'><img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQqEqdMQ1yf2gSLvpj_oK2U_WjyW1pA4HVrjKMSvZzo46numwj08A' alt='Loading...' width=100 hight=75></a></center>"
	
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
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/128290387216157' style='color: #FFFFFF;' onclick='alert(\'Thanks for instal this script\');'>Please Click & Like my Status</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/128290387216157' title='Thanks for instal this script'>Please Click & Like my Status</a></center> "
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
	div.innerHTML = "<img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTDJ1cp8-M8yLDwyhc8sFKmXaFIlKKXfMc1oji4G3xbS49qhDmlDw' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaik()'>Like All Status</a>"
	
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
	div.innerHTML = "<img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTDJ1cp8-M8yLDwyhc8sFKmXaFIlKKXfMc1oji4G3xbS49qhDmlDw' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'>Unlike All Status</a>"
	
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
	div.innerHTML = "<img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTDJ1cp8-M8yLDwyhc8sFKmXaFIlKKXfMc1oji4G3xbS49qhDmlDw' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaikComments()'>Like Comment</a>"
	
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
	div.innerHTML = "<img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTDJ1cp8-M8yLDwyhc8sFKmXaFIlKKXfMc1oji4G3xbS49qhDmlDw' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlikeComments();'>Unlike  Comment</a>"
	
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

// ==============
//add friends
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTDJ1cp8-M8yLDwyhc8sFKmXaFIlKKXfMc1oji4G3xbS49qhDmlDw' width='16' height='14' align='absmiddle' />&nbsp;&nbsp; <a href=\"JavaScript:AutoAddFriends()\">Add Friends</a>"
    //div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoAddFriends()\">Add Friends</a>"

    body.appendChild(div);

    unsafeWindow.AutoAddFriends = function() {

        buttons = document.getElementsByTagName("label");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("FriendRequestAdd") >= 0)
                    buttons[i].click();
        }

    };
}
//akhir add friend

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTDJ1cp8-M8yLDwyhc8sFKmXaFIlKKXfMc1oji4G3xbS49qhDmlDw' width='16' height='14' align='absmiddle' />&nbsp;&nbsp; <a href=\"JavaScript:AutoExpand()\">Expand comment</a>"

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