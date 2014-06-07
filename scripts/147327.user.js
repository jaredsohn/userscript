// ==UserScript==
// @name        LoL Auto-Logger
// @namespace   JackZR
// @description When on LoL LogIn page (*.leagueoflegends.com/user/login) it Auto-logs, just change credentials with yours.
// @include     *.leagueoflegends.com/user/*
// @version     2
// @grant       none
// ==/UserScript==

document.getElementById("name").value = "UserName"; // UserName
document.getElementById("pass").value = "PassWord"; // PassWord
var inputs = document.getElementsByTagName("input");
for(var i = 0; i < inputs.length; i++) {
	if(inputs[i].type === "submit" && inputs[i].value === "Log In") {
		inputs[i].form.submit();
		}
	}