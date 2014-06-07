// ==UserScript==
// @name        iwatch-online
// @namespace   perzer.com
// @description iwatch-online
// @include     *://www.iwatch365.net/*
// ==/UserScript==

var count = 0;
var time =2 * 60 * 1000;
document.title = "JavaEye";

function autoReload(){
	var url = window.location.href;
	var xmlhttp;
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}else{
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	count ++;
	var div = document.getElementById("_div_count_value");
	if(div == null || div == "" || div == "undefined"){
		div = document.createElement("DIV");
	}
	div.id = "_div_count_value";
	div.style.border = "1px";
	div.style.backgroundColor = "#60BADD";
	div.style.position = "absolute";
	div.style.top = "0px";
	div.style.left = "0px";
	div.style.zIndex = "9";
	div.innerHTML = "-- " + count + " --";
	document.body.appendChild(div);
}
autoReload();
window.setInterval(autoReload, time);