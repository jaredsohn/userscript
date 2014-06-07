// ==UserScript==
// @name			Facebook Auto Like  V 0.5 By Ade
// @namespace			ADE
// @version			0.5
// @copyright			Ade Putra . U
// @description			Auto Like And Confirm (mass) | You can mass like and confirm
// @author			Ade Putra(http://userscripts.org/users/430638)
// @icon			https://lh4.googleusercontent.com/-2A1Jpr4-1qM/TxPUbMq8IQI/AAAAAAAAAIU/_50N6LEgkxE/h120/FB.png
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			http://developers.facebook.com/*
// @exclude			https://developers.facebook.com/*
// Copyright (c) 2012, Ade Putra
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
	div.style.backgroundColor = "#CCD3E3";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><center><a style='color: #FFFFFF;' <a href='http://www.facebook.com/adebocahbangka' title='Click to See Ade Putra's Profile on Facebook'> Ade's Profile </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
    div2.style.width = "125px";
	div2.style.opacity = 0.90;
	div2.style.bottom = "+2px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Autolike'>&laquo;</a>&nbsp;<a href='http://adeputra-pkp.blogspot.com/' target='_blank' title='Autolike Version 0.5 by . FZUx Corporation | Copyright 2012 | All Right Reserved' style='color: #FFFFFF;'>Autolike V 0.5</a> | <a style='color: #FFFFFF;' onclick='thanks()'>#</a></div>"
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.thanks = function() {
	alert("Thanks for installing this autolike :)\n\nAde Putra\nCopyright (c) 2012");
	}
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.style.width = "125px";
		div2.innerHTML ="<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Autolike'>&laquo;</a>&nbsp;<a style='color: #FFFFFF;' href='http://adeputra-pkp.blogspot.com/' target='_blank' title='Autolike Version 0.5 by Ade Putra. FZUx Corporation | Copyright 2012 | All Right Reserved'>Autolike V 0.5</a> | <a style='color: #FFFFFF;' onclick='thanks()'>#</a></div>"
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
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='fajarlike()'>Like All</a>"
	
	body.appendChild(div);
	
	unsafeWindow.fajarlike = function() {
    javascript: (a = (b = document).createElement("script")).src = "//fajarzikri.googlecode.com/files/forlike.js",
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
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='javascript:void(0);'>Liked:</a>"
	
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
	div.style.backgroundColor = "#eceff5";
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
//special thanks to kaka.montague