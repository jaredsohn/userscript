// ==UserScript==
// @name        rorur
// @namespace   logo
// @include     http://*uykusuzsozluk.com/*
// @version     1


// ==/UserScript==

// ==============
// ==Logo==
body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = ".bgtop{ background-image: url('http://l1310.hizliresim.com/1g/4/t83qk.png') !important;  background-repeat: no-repeat !important; }"
	body.appendChild(div);
}
// ==============