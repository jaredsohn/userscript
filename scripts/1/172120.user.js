// ==UserScript==
// @name        My Email
// @namespace   http://printing.arc.losrios.edu/DSF/Admin/*
// @description Deletes usles emails
// @include     https://ex.losrios.edu/owa*
// @include     https://ex.losrios.edu
// @include     https://login.live.com/login*
// @version     1.3
// ==/UserScript==


//Log in to Work Email
(function(login) {
	document.addEventListener("keypress", function(e) {
	if(!e) e=window.event;
	var key = e.keyCode ? e.keyCode : e.which;
		if ( key == 115 ) { 
		document.getElementById('username') .value="xxxxxxxxx";
		document.getElementById('password') .value="xxxxxxxxxxxx";
		submit = document.getElementsByTagName('input')[8];
		submit.click();
		}
	}, true);
})();

//Log in to Peorsonal Email
(function(login) {
	document.addEventListener("keypress", function(e) {
	if(!e) e=window.event;
	var key = e.keyCode ? e.keyCode : e.which;
		if ( key == 115 ) { 
		document.getElementById('i0116') .value="xxxxxxxxxxxxxx";
		document.getElementById('i0118') .value="xxxxxxxxxxxxx";
		submit = document.getElementById('idSIButton9');
		submit.click();
		}
	}, true);
})();

//remove unused system folders (aplies only to my account)
(function (email) {
var str=document.getElementById("aUserTile").innerHTML;
var patt=/Savchenko, Andrey/g;
var result=patt.test(str);
	if (result==true){
//	alert("Savchenko, Andrey is signed in"); 
	str=document.getElementsByTagName("a")[0];
	var x=document.getElementById("fLgAAAAAO0clALv0uRKiYPcGaEYmcAQB1OGVOqs29SahwjT8pXBwvAAAGYgvJAAAF");  
	x.innerHTML=str.childNodes[0].nodeValue;
	par = x.parentNode.nodeName;
	par = x.parentNode.removeAttribute("class"); 

	var x=document.getElementById("fLgAAAAAO0clALv0uRKiYPcGaEYmcAQCo7/IBW/r7ToNFY5GE1eT9AAAHMAABAAAB");  
	x.innerHTML=str.childNodes[0].nodeValue;
	par = x.parentNode.nodeName;
	par = x.parentNode.removeAttribute("class"); 
	}
})();






