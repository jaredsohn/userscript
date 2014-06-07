// ==UserScript==
// @name          Facebook Auto Logon
// @description   Automatically login to your facebook page.
// @match         http://www.facebook.com/
// ==/UserScript==

var username = "email";
var password = "pass";
var persistant = "persistent";
var form = "login_form";

function saveCreds(){
	createCookie(username, document.getElementById(username).value, 365);
	//console.log("Saved u/n: " + document.getElementById(username).value);
	createCookie(password, document.getElementById(password).value, 365);
	//console.log("Saved p/w: " + document.getElementById(password).value);
}

function getCreds(){
	var un = readCookie(username);
	var pw = readCookie(password);
	//console.log("got u/n: " + un);
	//console.log("got p/w: " + pw);
	if (un != "" && pw != "" && un != null && pw != null){
		document.getElementById(username).value = un;
		document.getElementById(password).value = pw;
		document.getElementById(persistant).checked = true;
		document.getElementById(form).submit();
	}
	//console.log("done");
}

//document.getElementById("SubmitCreds").addEventListener("click", saveCreds, false);
document.getElementById(form).addEventListener("submit", saveCreds, false);
getCreds();

//-------Functions for working with cookies. Do not edit.--------

function createCookie(name,value,days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
