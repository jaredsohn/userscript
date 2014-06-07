// ==UserScript==
// @name			Facebook Auto Like By bayu-cemment
// @namespace		        http://bayu-cemment.blogspot.com
// @version			0.3
// @copyright		        bayu . U
// @description		        Auto Like And Confirm (mass) | You can mass like and confirm
// @author			bayu-cemment (http://userscripts.org/scripts/edit_src/129344)
// @icon			http://images.colourbox.com/thumb_COLOURBOX2180325.jpg
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			htt*://developers.facebook.com/*
//
// Copyright (c) 2012, Dedy afwan
// Auto Like/Unlike, And Another Function.


// ==/UserScript==

// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#CCD3E3";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><center><a style='color: #FFFFFF;' <a href='http://www.facebook.com/cemment'> bayu Profile </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+62px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://bayu-cemment.blogspot.com/' style='color: #FFFFFF;' onclick='alert(\'Thanks for install this script\');'>Created by bayu. Z</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://bayu-cemment.blogspot.com/' title='bayu-cemment'>Created by bayu. Z</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click to Show Widget'> Auto Like &raquo;</a>"
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
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Like All</a>"
	
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
// ==Unlike All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+21px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'>Unlike All</a>"
	
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
// ==Confirm All dan UnConfirm All==
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
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisConfirm();' >Confirm All</a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' >Unconfirm All</a>"
	
	body.appendChild(div);
	//suspend function
	function suspend(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisConfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}