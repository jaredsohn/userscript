// ==UserScript==
// @name			FB Auto Confirm
// @namespace			FACEBOOK AUTO Confirm Friend Request
// @description			Auto Like Facebook by ED4N 
// @include			http://*.facebook.com
// @include			http*://*.facebook.com


// ==/UserScript==


body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+9px";
	div.style.left = "+5px";
	div.style.backgroundColor = "#";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "0px";
	div.innerHTML = "[ <a onclick='OtomatisAbaikan();' >HIDDEN</a></a> ][ <a onclick='OtomatisKonfirm();' >CONFIRM ALL</a></a> ]"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisKonfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}