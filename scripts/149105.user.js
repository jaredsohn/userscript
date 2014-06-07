// ==UserScript==
// @name        Cisco Autologin
// @namespace   de
// @include     https://1.1.1.1/login.html*
// @version     1
// ==/UserScript==

addEventListener("DOMContentLoaded", function(){
	function getElm(name){
		return document.getElementsByName(name)[0];
	}
	getElm("username").value = "User";
	getElm("password").value = "Password";
	submitAction();
},false);