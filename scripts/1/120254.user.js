// ==UserScript==
// @name        Auto-login for UberStrike
// @author      Kevin Zucchini
// @version     0.1
// @namespace   uberStrike
// @description A script to auto-login to UberStrike
// @include	    *uberstrike.cmune.*
// ==/UserScript==
var autoPlay = true;
var username = "username here";
var password = "password here";

window.onload = function() {
try {
	if (document.getElementById("Email") != null) {
		//console.log("Found input boxes!");
		//var which = prompt("Which account do you want to use?","0");
		//document.getElementById("Email").value = username[parseFloat(which)];
		//document.getElementById("Password").value = password[parseFloat(which)];
		document.getElementById("Email").value = username;
		document.getElementById("Password").value = password;
		document.body.getElementsByClassName('darkGray')[0].click();
	}
	else {
		//console.log("Did not find input boxes! \(or canceled\)");
	}
}
catch (e) {
	alert(e.message);
}
if (document.body.getElementsByClassName("start_button")[0] && autoPlay) {
	window.location = "http://uberstrike.cmune.com/Play";
}
}