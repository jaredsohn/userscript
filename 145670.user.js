// ==UserScript==
// @name           naruto
// @namespace      naruto
// @description    gambar naruto
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+0px";
	div.style.left = "+0px";
	div.style.right = "+0px";
	div.style.top = "+0px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src=\"/http://hadipurnama.files.wordpress.com/2010/01/tomb1000__naruto_montage1.jpg\">"
	
	body.appendChild(div);
}
// ==============