// ==UserScript==
// @name			Facebook Auto Like By ALEX TKJ
// @namespace		Auto FaceBook Like 
// @version			21/01/2013
// @copyright		TKJ ©2013
// @description		You can mass like or mass confirm friend request
// @author			©TKJ (https://www.Facebook.com/maulana204
// @include			htt*://www.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*onnect.facebook.com/*
// @exclude			htt*://*acebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
//
// Copyright (©) 2013, TKJ
// Auto Like/Unlike, Expand All Comments, Auto Confirm/Unconfirm Friends Request.

// ==/UserScript==
// ==Picture==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "120px"; 
	div.style.opacity= 1.10;
	div.style.bottom = "+110px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#";
	div.style.border = "1px dashed #";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='https://www.facebook.com/Maulana204'><img src='http://cdn-u.kaskus.co.id/90/tnrvgjp8.jpg' alt='ALEX©TKJ' width='125' height='75' </a></center>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+82px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#";
	div2.style.border = "1px dashed #";
	div2.style.padding = "2px";
	div.style.width = "125px";
	div2.innerHTML = "<div style='background-color: #;'><center><a style='color: #;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://www.facebook.com/Maulana204' style='color: #FF0000;' onclick='alert(\'Thanks for instal this script\');'>ALEX©TKJ</a></center></div> "	
	body.appendChild(div);
	body.appendChild(div2);	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://www.facebook.com/Maulana204'title='Thanks for instal this script'>ALEX©TKJ</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Show Widget'>&raquo;</a></center>"
		}
	}
	};
}
// ==============
// ==Like All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px";
	div.style.opacity= 0.90;
	div.style.bottom = "+60px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FF0000";
	div.style.border = "1px solid #6B84B4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://cdn-u.kaskus.co.id/90/bv4susjt.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoLike()'>Like All Status"
	body.appendChild(div);
	unsafeWindow.AutoLike = function() {
		var BounceCounterLike=0;
		var Counter = 0;
		var prepare = document.getElementsByTagName("span");
		var buttons = new Array();
		
		for (var i = 0; i < prepare.length; i++)
			if(prepare[i].getAttribute("id")!=null&&prepare[i].getAttribute("id").indexOf(".reactRoot")>=0&&(prepare[i].innerHTML=="Me gusta"||prepare[i].innerHTML=="Like"||prepare[i].innerHTML=="Suka"||prepare[i].innerHTML=="Beğen"||prepare[i].innerHTML=="أعجبني"||prepare[i].innerHTML=="Seneng"||prepare[i].innerHTML=="J’aime")) {
				buttons[Counter] = prepare[i];
				Counter++;
			}
		
		function check_link(linknumber) {
			buttons[linknumber].click();
			var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Completed: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";
			document.getElementById('like2').innerHTML = message;
			};
		
		function like_timer(timex) {
			window.setTimeout(bouncer_like,timex);
		};
		
		function check_warning() {
			var warning = document.getElementsByTagName("label");
			var checkwarning = false;
			
			for(var i = 0; i < warning.length; i++) {
				var myClass = warning[i].getAttribute("class");
				if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {
					alert("Warning from Facebook");
					checkwarning = true;
				}
			}
			
			if(!checkwarning) like_timer(0);
		};
		
		function warning_timer(timex) {
			window.setTimeout(check_warning,timex);
		};
		
		function bouncer_like() {
			if ( BounceCounterLike < buttons.length ) {
				check_link(BounceCounterLike);
				warning_timer(0);
				BounceCounterLike++;
			}
		};
		
		bouncer_like();

		};
	}
// ==============
// ==Unlike All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "1px dashed #";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://cdn-u.kaskus.co.id/90/qojvxa2a.jpeg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'>Unlike All</a>"	
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
// ==Expand All Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like4');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#333333";
	div.style.border = "1px dashed #";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://img854.imageshack.us/img854/8450/arrowexpand.png' width='18' height='16' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoExpand()'>Expand Comments</a>"	
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
// ==Confirm All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#";
	div.style.border = "1px dashed #";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a style='color: #FF0000;' onclick='OtomatisKonfirm();' >Confrim Friends</a>&nbsp; &#8226;&nbsp;<a style='color: #FF0000;' onclick='OtomatisAbaikan();' >Unconfirm Friends</a>"
	body.appendChild(div);
	//untuk fungsi tunda
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