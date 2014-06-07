// ==UserScript==
// @name			Cyberoam autologin
// @description		Automatically log into your cyberoam account.
// ==/UserScript==


var username = "10103092";
var password = "!@#$";

function lgin() {

	console.log("Entered lgin()");
	var button = document.getElementById("logincaption");
	var value = button.getAttribute("value");
	
	if (value === "Login") {
	
		document.getElementsByName("username")[0].value = username;
		
		document.getElementsByName("password")[0].value = password;
		
		button.click();
	}
}

window.onload = lgin ;