// ==UserScript==
// @name           Facebook Kita Like Semua
// @namespace      OtomatisLikeCuy Ver 2.0
// @description    Kita Like Semua OK, special dedicated for jempolers
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==For My Lovely==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+123px";
	div.style.left = "+6px";
	div.style.width = "125px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='http://www.facebook.com/profile.php?id=100000061994574'><img src='http://cdn-u.kaskus.us/20/x39rbv3h.gif' alt='Loading...' width=100 hight=75></a></center>"
	
