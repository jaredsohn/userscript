// ==UserScript==
// @name        lecture rutube
// @namespace   http://http://rutube.ru
// @description afin de réussir à lire
// @include     http://rutube.ru/*
// @version  
// ==/UserScript==

var code = document.getElementById("pcode").value;
var player = document.getElementById("pid");
player.innerHTML = code;
player.getElementsByTagName("object")[0].width = "100%";
player.getElementsByTagName("object")[0].height = "180%";
player.getElementsByTagName("embed")[0].width = "100%";
player.getElementsByTagName("embed")[0].height = "180%";

 h = document.getElementsByTagName("h1")[0];
 h.innerHTML = h.innerHTML+" <span>Cinéma</span>";
h.addEventListener('click', function() { 
	var player = document.getElementById("pid");
	var b = document.body;
	player.getElementsByTagName("object")[0].width = "100%";
	player.getElementsByTagName("object")[0].height = "98%";
	player.getElementsByTagName("embed")[0].width = "100%";
	player.getElementsByTagName("embed")[0].height = "98%";
	 b.innerHTML =player.innerHTML; 
	b.style.background = "black";
	b.style.width = "100%";
	b.style.height = "100%"; 
	b.style.position = "absolute";
}, true);