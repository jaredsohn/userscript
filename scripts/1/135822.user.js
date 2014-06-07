// ==UserScript==
// @name           Auto Like Facebook Statuses by Pilove
// @namespace      autolikefbstat
// @description    Automaticly Like Facebook Status for Friends, Group, etc.
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+88px";
	div.style.left = "+6px";
	div.style.opacity= 0.50;
	div.style.backgroundColor = "green";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:white\" href=\"http://www.facebook.com/whitehouseUSA\">Auto Like FB By Pi coollove</a>"
	
	body.appendChild(div);
}
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+6px";
	div.style.opacity= 0.90;
	div.style.backgroundColor = "blue";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:white\" href=\"javascript:checkLikes()\">Picoollve production<br>THPT THUC HANH CAO NGUYEN<br>click auto hpbd fr</a>"
	
	body.appendChild(div);
}
// ==============
// ==Fanpage==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+21px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/pikullove\">FanPage AutoLike</a>"
	
	body.appendChild(div);
}
// ==============
// ==Ahmad Safar==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/whitehouseUSA\">pi.cool.love@gmail.com</a>"

	body.appendChild(div);
}

var didlikes=0;

function random_from_to(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var $$ = function() {
	return document.querySelectorAll.apply(document, arguments);
};

function checkLikes() {
	var llist = $$("button.like_link[name=like]");
	var f = (function() {
		var i=llist.length-1;
		if (i<0) return null;
		return function() {
			llist[i--].click();
			didlikes++;
			if (i<0 || didlikes>99999) window.clearInterval(likeq);			
		}})();
		
	if (f) {
		var rnd = random_from_to(100,150);
		var likeq = window.setInterval(f, rnd);
	}
}

checkLikes();
var rnm = random_from_to(1000, 3000);
window.setInterval(checkLikes, rnm);
